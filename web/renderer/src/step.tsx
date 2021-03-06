import { FunctionalComponent, h, Fragment, JSX } from "preact";
import { useMemo, useState } from "preact/hooks";
import { expand } from './util';

type Params = {
  step: Record<string, any>;
  params: Record<string, string>;
  number: JSX.Element;
};

const Step: FunctionalComponent<Params> = ({ step, params, number }: Params) => {
  console.log(step);
  if('append' in step || 'replace' in step) {
    const cont = expand(step.with, params);

    return <div class={`mr-step mr-step-${'append' in step ? 'append' : 'replace'}`}>
      <div class="mr-step-header">
        {number}
        <div class="mr-step-op">{'append' in step ? 'Append to file' : 'Replace file'}</div>
      </div>

      <div class="mr-step-path">{step.replace ?? step.append}</div>

      <pre class="mr-step-file">{cont}</pre>
    </div>
  } else if('run' in step) {
    const cont = expand(step.run, params);

    return <div class={'mr-step mr-step-run'}>
      <div class="mr-step-header">
        {number}
        <div class="mr-step-op">Run script</div>
      </div>

      {step.with && <div class="mr-step-executor">{step.with}</div> }

      <pre class="mr-step-script">{cont}</pre>
    </div>
  } else if('manually' in step) {
    const cont = expand(step.manually, params);

    return <div class={'mr-step mr-step-run'}>
      <div class="mr-step-header">
        {number}
        <div class="mr-step-op">Manually do</div>
      </div>

      <pre class="mr-step-manually">{cont}</pre>
    </div>
  }

  return null;
};

export default Step;