use std::{
    borrow::Borrow,
    collections::{HashMap, HashSet},
};

use colored::Colorize;
use regex::Regex;

/**
 * Variable expansion, etc.
 */

enum Component<'a> {
    Raw(&'a str),
    Var(&'a str),
}

fn to_components<'a>(input: &'a str) -> Vec<Component<'a>> {
    let regex = Regex::new("\\{ *([A-Z0-9_]+) *\\}").unwrap();
    let mut result = Vec::new();
    let mut last = 0;
    for captures in regex.captures_iter(input) {
        let outer = captures.get(0).unwrap();
        let inner = captures.get(1).unwrap();

        if outer.start() != last {
            result.push(Component::Raw(&input[last..outer.start()]));
        }

        result.push(Component::Var(inner.as_str()));
        last = outer.end();
    }

    if last != input.bytes().len() {
        result.push(Component::Raw(&input[last..]));
    }

    result
}

pub fn expand_params<'a>(
    raw: &'a HashMap<String, String>,
) -> anyhow::Result<HashMap<&'a str, String>> {
    let components: HashMap<&'a str, Vec<Component>> = raw
        .iter()
        .map(|(k, v)| (k.as_str(), to_components(v.as_str().into())))
        .collect();

    let sorted = topo_sort(&components)?;
    let mut stash: HashMap<&'a str, String> = HashMap::new();
    for key in sorted {
        let result = join_unchecked(components.get(key).unwrap(), &stash).unwrap();
        stash.insert(key, result);
    }

    Ok(stash)
}

fn topo_sort<'a>(comp: &HashMap<&'a str, Vec<Component<'a>>>) -> anyhow::Result<Vec<&'a str>> {
    let mut done = HashSet::new();
    let mut in_stack = HashSet::new();

    let mut sorted = vec![];
    let mut stack = vec![];

    for (k, _) in comp.iter() {
        topo_sort_inner(*k, comp, &mut stack, &mut in_stack, &mut done, &mut sorted)?;
        assert_eq!(stack.len(), 0);
        assert_eq!(in_stack.len(), 0);
    }

    assert_eq!(sorted.len(), comp.len());
    assert_eq!(done.len(), comp.len());

    Ok(sorted)
}

fn topo_sort_inner<'a>(
    cur: &'a str,
    all: &HashMap<&'a str, Vec<Component<'a>>>,
    stack: &mut Vec<&'a str>,
    in_stack: &mut HashSet<&'a str>,
    done: &mut HashSet<&'a str>,
    sorted: &mut Vec<&'a str>,
) -> anyhow::Result<()> {
    if done.contains(cur) {
        return Ok(());
    }

    if !in_stack.insert(cur) {
        // Already in stack, backtrack stack
        println!(
            "{}: cycle detected when expanding parameters:",
            "Error".red()
        );
        println!(" # {}", cur.yellow());
        while let Some(k) = sorted.pop() {
            println!(" ^ {}", k.yellow());
            if k == cur {
                break;
            };
        }

        return Err(anyhow::anyhow!("Failed to expand parameters"));
    }
    stack.push(cur);

    let comps = match all.get(cur) {
        Some(i) => i,
        None => {
            println!("{}: missing parameter: {}", "Error".red(), cur.yellow());
            return Err(anyhow::anyhow!("Failed to expand parameters"));
        }
    };

    for comp in comps {
        if let Component::Var(v) = comp {
            topo_sort_inner(*v, all, stack, in_stack, done, sorted)?;
        }
    }

    sorted.push(cur);
    assert!(done.insert(cur));

    assert_eq!(stack.pop(), Some(cur));
    assert!(in_stack.remove(cur));
    Ok(())
}

fn join_unchecked(
    input: &Vec<Component>,
    params: &HashMap<&str, String>,
) -> anyhow::Result<String> {
    let mut ret = String::new();
    for comp in input.into_iter() {
        match comp {
            Component::Raw(r) => ret.push_str(r.borrow()),
            Component::Var(k) => {
                let borrowed: &str = k.borrow();
                let value = match params.get(borrowed) {
                    Some(i) => i,
                    None => {
                        println!("{}: missing parameter: {}", "Error".red(), k.yellow());
                        return Err(anyhow::anyhow!("Failed to expand"));
                    }
                };
                ret.push_str(value.as_str());
            }
        }
    }
    Ok(ret)
}
