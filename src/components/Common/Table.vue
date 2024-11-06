<script setup></script>

<template>
    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-800">
            <tr>
               <slot name="cols"></slot>
            </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
            <slot name="rows"></slot>
        </tbody>
    </table>
</template>

<style>
    th {
        @apply px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400
    }

    td {
        @apply px-12 py-3.5 text-sm font-medium whitespace-nowrap text-gray-700
    }
</style>