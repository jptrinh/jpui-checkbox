<template>
    <div class="checkbox-wrapper" :class="{ 'is-disabled': props.content?.disabled }" :style="wrapperStyle">
        <div class="checkbox-inner">
            <!-- Left label dropzone -->
            <div
                v-if="props.content?.labelPosition === 'left'"
                class="checkbox-label"
                :class="{ 'is-clickable': props.content?.clickableLabel !== false }"
                @click="props.content?.clickableLabel !== false ? handleToggle() : undefined"
            >
                <wwLayout path="dropzoneContent" direction="row" />
            </div>

            <!-- Custom checkbox button -->
            <button
                class="checkbox-box"
                :class="{
                    'is-checked': internalValue === true,
                    'is-indeterminate': internalValue === null,
                    'is-disabled': props.content?.disabled,
                    'is-readonly': props.content?.readonly,
                    'is-invalid': props.content?.invalid && internalValue !== true && internalValue !== null,
                }"
                role="checkbox"
                :aria-checked="ariaChecked"
                :aria-invalid="props.content?.invalid || false"
                :aria-required="props.content?.required || false"
                :aria-disabled="props.content?.disabled || false"
                :disabled="props.content?.disabled || false"
                @click="handleToggle"
            >
                <Transition name="mark">
                    <span
                        v-if="internalValue === true || internalValue === null"
                        class="checkbox-mark"
                        aria-hidden="true"
                    >
                        <template v-if="internalValue === true">
                            <span v-if="props.content?.checkmarkSvg" v-html="props.content.checkmarkSvg" />
                            <svg v-else viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <polyline
                                    points="1.5,6.5 4.5,9.5 10.5,2.5"
                                    stroke="currentColor"
                                    stroke-width="1.75"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </template>
                        <template v-else>
                            <span v-if="props.content?.indeterminateSvg" v-html="props.content.indeterminateSvg" />
                            <svg v-else viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line
                                    x1="2"
                                    y1="6"
                                    x2="10"
                                    y2="6"
                                    stroke="currentColor"
                                    stroke-width="1.75"
                                    stroke-linecap="round"
                                />
                            </svg>
                        </template>
                    </span>
                </Transition>
            </button>

            <!-- Right label dropzone (default) -->
            <div
                v-if="props.content?.labelPosition !== 'left'"
                class="checkbox-label"
                :class="{ 'is-clickable': props.content?.clickableLabel !== false }"
                @click="props.content?.clickableLabel !== false ? handleToggle() : undefined"
            >
                <wwLayout path="dropzoneContent" direction="row" />
            </div>
        </div>
    </div>
</template>

<script>
import { computed, watch, inject } from 'vue';

export default {
    props: {
        uid: { type: String, required: true },
        content: { type: Object, required: true },
        wwElementState: { type: Object, required: true },
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
    },

    emits: ['trigger-event'],

    setup(props, { emit }) {
        /* wwEditor:start */
        const selectForm = inject('_wwForm:selectForm', () => {});
        /* wwEditor:end */

        const { value: internalValue, setValue: setInternalValue } = wwLib.wwVariable.useComponentVariable({
            uid: props.uid,
            name: 'value',
            type: 'any',
            defaultValue: props.content?.initialValue ?? false,
        });

        watch(
            () => props.content?.initialValue,
            newValue => {
                setInternalValue(newValue ?? false);
            },
            { immediate: true }
        );

        // ─── Form integration ───────────────────────────────────────────────────

        const fieldName = computed(() => props.content?.fieldName || props.wwElementState?.name || '');
        const validation = computed(() => props.content?.validation);
        const customValidation = computed(() => props.content?.customValidation);
        const initialValue = computed(() => props.content?.initialValue ?? false);

        const useForm = inject('_wwForm:useForm', () => {});
        useForm(
            internalValue,
            { fieldName, validation, customValidation, initialValue },
            { elementState: props.wwElementState, emit, sidepanelFormPath: 'form', setValue: setInternalValue }
        );

        // ─── ARIA ───────────────────────────────────────────────────────────────

        const ariaChecked = computed(() => {
            if (internalValue.value === null) return 'mixed';
            return internalValue.value ? 'true' : 'false';
        });

        // ─── Toggle logic ───────────────────────────────────────────────────────

        const handleToggle = () => {
            if (props.content?.disabled || props.content?.readonly) return;

            const newValue = internalValue.value !== true;
            setInternalValue(newValue);

            emit('trigger-event', { name: 'change', event: { value: newValue } });
            emit('trigger-event', { name: newValue ? 'checked' : 'unchecked', event: { value: newValue } });
        };

        // ─── Component actions ──────────────────────────────────────────────────

        const actionCheck = () => {
            if (internalValue.value === true) return;
            setInternalValue(true);
            emit('trigger-event', { name: 'change', event: { value: true } });
            emit('trigger-event', { name: 'checked', event: { value: true } });
        };

        const actionUncheck = () => {
            if (internalValue.value === false) return;
            setInternalValue(false);
            emit('trigger-event', { name: 'change', event: { value: false } });
            emit('trigger-event', { name: 'unchecked', event: { value: false } });
        };

        const actionToggle = () => {
            const newValue = internalValue.value !== true;
            setInternalValue(newValue);
            emit('trigger-event', { name: 'change', event: { value: newValue } });
            emit('trigger-event', { name: newValue ? 'checked' : 'unchecked', event: { value: newValue } });
        };

        const actionSetIndeterminate = () => {
            if (internalValue.value === null) return;
            setInternalValue(null);
            emit('trigger-event', { name: 'change', event: { value: null } });
            emit('trigger-event', { name: 'indeterminate', event: { value: null } });
        };

        // ─── Styles ─────────────────────────────────────────────────────────────

        const wrapperStyle = computed(() => ({
            '--cb-size': props.content?.size || '20px',
            '--cb-radius': props.content?.borderRadius || '4px',
            '--cb-border-width': `${props.content?.borderWidth ?? 2}px`,
            '--cb-gap': props.content?.gap || '8px',
            '--cb-primary': props.content?.primaryColor || '#3b82f6',
            '--cb-mark-color': props.content?.markColor || '#ffffff',
            '--cb-unchecked-border': props.content?.uncheckedBorderColor || '#d1d5db',
            '--cb-unchecked-bg': props.content?.uncheckedBgColor || '#ffffff',
            '--cb-invalid-border': props.content?.invalidBorderColor || '#ef4444',
            '--cb-invalid-focus-ring-color': props.content?.invalidFocusRingColor || '#fca5a5',
            '--cb-readonly-opacity': props.content?.readonlyOpacity ?? 1,
            '--cb-checked-hover': props.content?.checkedHoverColor || '#2563eb',
            '--cb-focus-ring-color': props.content?.focusRingColor || '#93c5fd',
            '--cb-focus-ring-width': props.content?.focusRingWidth || '3px',
            '--cb-focus-ring-offset': props.content?.focusRingOffset || '2px',
            '--cb-disabled-opacity': props.content?.disabledOpacity ?? 0.5,
            '--cb-icon-size': props.content?.iconSize || '65%',
            '--cb-shadow': props.content?.shadow || 'none',
            '--cb-anim-duration': `${props.content?.animationDuration ?? 150}ms`,
            '--cb-cursor': props.content?.cursorPointer !== false ? 'pointer' : 'default',
            '--cb-vertical-align': { top: 'flex-start', center: 'center', bottom: 'flex-end' }[props.content?.verticalAlign] ?? 'center',
            '--cb-margin-top': props.content?.marginTop || '0px',
            '--cb-margin-bottom': props.content?.marginBottom || '0px',
        }));

        // ─── Local context ──────────────────────────────────────────────────────

        const localData = computed(() => ({
            value: internalValue.value,
            isChecked: internalValue.value === true,
            isIndeterminate: internalValue.value === null,
            disabled: props.content?.disabled || false,
            readonly: props.content?.readonly || false,
            invalid: props.content?.invalid || false,
        }));

        const markdown = `### Checkbox local information

#### value
Current checkbox value:
- \`true\`: Checked
- \`false\`: Unchecked
- \`null\`: Indeterminate

#### isChecked
Boolean — whether the checkbox is checked.

#### isIndeterminate
Boolean — whether the checkbox is in indeterminate state.

#### disabled
Boolean — whether the checkbox is disabled.

#### invalid
Boolean — whether the checkbox is in an invalid state.

**Usage:**
\`\`\`
context.local.data?.['checkbox']?.['value']
context.local.data?.['checkbox']?.['isChecked']
context.local.data?.['checkbox']?.['isIndeterminate']
\`\`\`
`;

        wwLib.wwElement.useRegisterElementLocalContext('checkbox', localData.value, {}, markdown);

        return {
            props,
            internalValue,
            ariaChecked,
            wrapperStyle,
            handleToggle,
            actionCheck,
            actionUncheck,
            actionToggle,
            actionSetIndeterminate,
        };
    },
};
</script>

<style lang="scss" scoped>
.checkbox-inner {
    display: flex;
    align-items: var(--cb-vertical-align);
    gap: var(--cb-gap);
}

.checkbox-box {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: var(--cb-size);
    height: var(--cb-size);
    min-width: var(--cb-size);
    border-radius: var(--cb-radius);
    border: var(--cb-border-width) solid var(--cb-unchecked-border);
    background-color: var(--cb-unchecked-bg);
    padding: 0;
    margin: var(--cb-margin-top) 0 var(--cb-margin-bottom);
    appearance: none;
    cursor: var(--cb-cursor);
    box-shadow: var(--cb-shadow);
    transition: background-color var(--cb-anim-duration) ease, border-color var(--cb-anim-duration) ease, box-shadow var(--cb-anim-duration) ease;

    // Expand clickable area to 44px minimum touch target without affecting layout
    &::after {
        content: '';
        position: absolute;
        inset: -8px -12px;
    }

    // Checked or indeterminate: fill with primary color
    &.is-checked,
    &.is-indeterminate {
        border-color: var(--cb-primary);
        background-color: var(--cb-primary);
    }

    // Hover on unchecked (not active state, not disabled)
    &:not(.is-checked):not(.is-indeterminate):not(.is-disabled):not(.is-readonly):hover {
        border-color: var(--cb-primary);
    }

    // Hover on checked or indeterminate
    &.is-checked:not(.is-disabled):not(.is-readonly):hover,
    &.is-indeterminate:not(.is-disabled):not(.is-readonly):hover {
        background-color: var(--cb-checked-hover);
        border-color: var(--cb-checked-hover);
    }

    // Invalid unchecked state — red border
    &.is-invalid {
        border-color: var(--cb-invalid-border);

        &:not(.is-disabled):not(.is-readonly):hover {
            border-color: var(--cb-invalid-border);
        }
    }

    // Remove default focus outline
    &:focus {
        outline: none;
    }

    // Keyboard focus ring (focus-visible only)
    &:focus-visible {
        outline: var(--cb-focus-ring-width) solid var(--cb-focus-ring-color);
        outline-offset: var(--cb-focus-ring-offset);
    }

    &.is-invalid:focus-visible {
        outline-color: var(--cb-invalid-focus-ring-color);
    }

    &.is-readonly {
        cursor: default;
        opacity: var(--cb-readonly-opacity);
    }
}

// Disabled: cursor on wrapper (inner has pointer-events:none so cursor must live on parent)
.checkbox-wrapper.is-disabled {
    cursor: not-allowed;
}

.checkbox-wrapper.is-disabled .checkbox-inner {
    opacity: var(--cb-disabled-opacity);
    pointer-events: none;
}

.checkbox-mark {
    width: var(--cb-icon-size);
    height: var(--cb-icon-size);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: visible;
    pointer-events: none;
    color: var(--cb-mark-color);

    > svg {
        width: 100%;
        height: 100%;
        display: block;
        overflow: visible;
    }

    // v-html wrapper span for custom SVGs
    > span {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;

        > svg {
            width: 100%;
            height: 100%;
            display: block;
        }
    }
}

.mark-enter-active,
.mark-leave-active {
    transition: opacity var(--cb-anim-duration) ease, transform var(--cb-anim-duration) ease;
}

.mark-enter-from,
.mark-leave-to {
    opacity: 0;
    transform: scale(0.5);
}

.checkbox-label {
    display: flex;
    align-items: center;
    min-width: 0;
    cursor: var(--cb-cursor);
}
</style>
