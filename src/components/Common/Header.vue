<script setup></script>

<template>
    <header class="bg-gray-50 py-8">
        <nav class="container px-4 mx-auto flex justify-between items-center">
            <div class="text-2xl font-semibold text-gray-800 dark:text-white">
                <a href="#" class="text-gray-800 hover:text-blue-500">Gestão de Vendas</a>
            </div>
            <ul class="flex space-x-6">
                <li>
                    <a href="/seller" class="text-gray-700 hover:text-blue-500 dark:text-white dark:hover:text-blue-400">
                        Vendedores
                    </a>
                </li>
                <li>
                    <a href="/sale" class="text-gray-700 hover:text-blue-500 dark:text-white dark:hover:text-blue-400">
                        Vendas
                    </a>
                </li>
            </ul>
        </nav>
    </header>
    <div class="container py-12 px-4 mx-auto">
        <div class="sm:flex sm:items-center sm:justify-between">
            <div>
                <div class="flex items-center gap-x-3">
                    <h2 class="text-lg font-medium text-gray-800 dark:text-white">
                        <slot name="title"></slot>
                    </h2>

                    <span class="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
                        <slot name="counter"></slot>
                    </span>
                </div>

                <p class="mt-1 text-sm text-gray-500 dark:text-gray-300">
                    <slot name="description"></slot>
                </p>
            </div>
        </div>
    </div>
</template>