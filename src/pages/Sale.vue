<script setup>
import { ref } from 'vue';
import Header from '../components/Common/Header.vue';
import Table from '../components/Common/Table.vue';
import Pagination from '../components/Common/Pagination.vue';

const sales = ref([
  { id: 1, sold_at: '2024-04-11', value: 1000, seller: {name: 'Lucas'}},
  { id: 2, sold_at: '2024-04-11', value: 1000, seller: {name: 'Lucas'}},
  { id: 3, sold_at: '2024-04-11', value: 1000, seller: {name: 'Lucas'}},
]);
</script>

<template>
    <Header>
        <template #title>Vendas</template>
        <template #description>Aqui você pode visualizar todas as vendas</template>
        <template #counter>{{sales.length || 0}} vendas</template>
    </Header>
    <section class="container py-12 px-4 mx-auto">

        <div class="flex flex-col mt-6">
            <Table>
                <template #cols>
                    <th scope="col">
                        ID
                    </th>

                    <th scope="col">
                        Valor
                    </th>

                    <th scope="col">Data</th>
                    <th scope="col">Vendedor</th>

                    <th scope="col" class="relative py-3.5 px-4">
                        <span class="sr-only">Edit</span>
                    </th>
                </template>
                <template #rows>
                    <tr v-for="sale in sales" :key="sale.id">
                        <td>
                            {{sale.id}}
                        </td>
                        <td>
                            {{sale.value}}
                        </td>
                        <td>
                            {{sale.seller.name}}
                        </td>
                        <td>
                            {{sale.sold_at}}
                        </td>

                        <td>
                            <button class="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                </svg>
                            </button>
                        </td>
                    </tr>
                </template>
            </Table>
        </div>

        <Pagination></Pagination>
    </section>
</template>
