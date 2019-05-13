<!-- page template start -->
{{#each components}}
    {{#if options}}
        {{#if_component component compare="input"}}<!-- input type="text"-->
            <li component="{{options.compontent}}" {{#if options.liClassName}} class="{{options.liClassName}}"{{/if}}>
                <label for="{{options.name}}">{{options.label}}</label>
                <div>
                    <input type="text" name="{{options.name}}" {{#if options.inputClassName}} class="{{options.inputClassName}}"{{/if}}
                        {{#if options.defaultVal}} value="{{options.defaultVal}}" {{/if}}
                        {{#if options.readonly}} readonly="readonly" {{/if}}
                        {{#if options.disabled}} disabled="disabled" {{/if}}
                    />
                </div>
             </li>
        {{/if_component}}
    {{/if}}
{{/each}}
<!-- page template end -->