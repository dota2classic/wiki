<script setup>
    defineProps({
        color: {
            type: String,
            default: 'magenta',
        }
    });
</script>

<template>
    <span class="tag" :class="`tag-${color}`">
        <slot>sample text</slot>
    </span>
</template>

<style scoped>
    .tag {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-size: 12px;
        line-height: calc(1.6666666666666667 * 12px);
        list-style: none;
        display: inline-block;
        height: auto;
        margin-inline-end: 8px;
        padding-inline: calc(8px - 1px);
        white-space: nowrap;
        border: 1px solid;
        border-radius: 4px;
        opacity: 1;
        text-align: start;
        position: relative;
        z-index: 10;
    }

    .tag.tag-dark {
        color: #91969f;
        background: var(--color-card-1);
        border-color: #2E3135;
    }

    .tag.tag-magenta {
        color: var(--magenta-7);
        background: var(--magenta-1);
        border-color: var(--magenta-3);
    }

    .tag.tag-red {
        color: var(--red-7);
        background: var(--red-1);
        border-color: var(--red-3);
    }

    .ant.tag-volcano {
        color: var(--volcano-7);
        background: var(--volcano-1);
        border-color: var(--volcano-3);
    }

    .tag.tag-orange {
        color: var(--orange-7);
        background: var(--orange-1);
        border-color: var(--orange-3);
    }

    .tag.tag-gold {
        color: var(--gold-7);
        background: var(--gold-1);
        border-color: var(--gold-3);
    }

    .tag.tag-lime {
        color: var(--lime-7);
        background: var(--lime-1);
        border-color: var(--lime-3);
    }

    .tag.tag-green {
        color: var(--green-7);
        background: var(--green-1);
        border-color: var(--green-3);
    }

    .tag.tag-cyan {
        color: var(--cyan-7);
        background: var(--cyan-1);
        border-color: var(--cyan-3);
    }

    .tag.tag-blue {
        color: var(--blue-7);
        background: var(--blue-1);
        border-color: var(--blue-3);
    }

    .tag.tag-geekblue {
        color: var(--geekblue-7);
        background: var(--geekblue-1);
        border-color: var(--geekblue-3);
    }

    .tag.tag-purple {
        color: var(--purple-7);
        background: var(--purple-1);
        border-color: var(--purple-3);
    }
</style>

