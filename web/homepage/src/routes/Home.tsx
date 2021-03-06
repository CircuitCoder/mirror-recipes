import { FunctionalComponent, h, Fragment } from "preact";
import style from './Home.scss';
import clsx from 'clsx';
import { Link } from "preact-router";

const Home: FunctionalComponent = () => {
  return (
    <>
      <div class={style.banner}>
        <div class={style.container}>
          <div class={style.title}>mirror-recipes</div>
          <div class={style.buttons}>
            <button class={clsx(style.button, style.primary)}>
              Download Driver
            </button>
            <Link href="/recipe">
              <button class={style.button}>Explore Recipes</button>
            </Link>
          </div>
        </div>
      </div>
      <div class={style.container}>
        <div class={style.tldr}>
          <p>
            <a href="https://github.com/CircuitCoder/mirror-recipes">
              mirror-recipes
            </a>{" "}
            is a project aiming to produce a general description of{" "}
            <strong>procedures to apply various open source mirrors</strong>, so
            that it can be used as:
            <ul>
              <li>a source format to render documentations</li>
              <li>
                a script to apply mirrors automatically to one's installation
              </li>
              <li>directly readable references</li>
            </ul>
          </p>
        </div>

        <div class={style.sub}>Scope</div>

        <p>
          In the box there are three main components:
          <ul>
            <li>
              Recipes themself, containing procudures, parameter presets for
              well-known mirror sites and JSON schemas for validating them
            </li>
            <li>
              A driver written in Rust for applying recipes on Linux/Unix
              environments
            </li>
            <li>
              A preact component with Custom Element wrapper for rendering
              recipes in webpages
            </li>
          </ul>
        </p>

        <p>
          What's considered a <em>open source software mirror</em> is hard to
          define. But generally speaking, you can expect to find repositories
          and update sites of Linux distributions, utilitites (e.g. TexLive),
          etc. as those are mirrors that you can{" "}
          <em>apply to your installation</em>. Other forms of mirrors (Fonts,
          ISO images) are not within the scope of this project.
        </p>

        <div class={style.sub}>Contributing</div>

        <p>
          This project is still in early development, so the recipe formats and
          API are subject to severe changes. That said, we welcome contributions
          of all forms, especially for recipes and site presets, as well as
          procedures in existing recipes for lesser-known platforms.
        </p>

        <p>
          To add a new recipe or preset, a short-name/slug would have to be
          allocated for it. Please use the generally agreed on names (e.g.{" "}
          <code>ubuntu</code> for Ubuntu package, <code>TUNA</code> for Tsinghua
          TUNA Mirrors).
        </p>

        <p>
          For more guidance, please refer to the <code>CONTRIBUTE</code> file in
          the GitHub repository.
        </p>
      </div>

      <div class={style.footer}>
        Made with &lt;3 by TUNA contributors. Contents within this site are
        distributed under the MIT License.
      </div>
    </>
  );
};

export default Home;