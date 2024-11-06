<script setup>
import { ref } from 'vue';
import Header from '../components/Common/Header.vue';
import Table from '../components/Common/Table.vue';
import Pagination from '../components/Common/Pagination.vue';

const sellers = ref([
  { id: 1, name: 'João Silva', email: 'joao.silva@email.com' },
  { id: 2, name: 'Maria Souza', email: 'maria.souza@email.com' },
  { id: 3, name: 'Carlos Oliveira', email: 'carlos.oliveira@email.com' },
]);
</script>

<template>
    <Header>
        <template #title>Vendedores</template>
        <template #description>Aqui você pode visualizar todos os vendedores</template>
        <template #counter>{{sellers.length || 0}} vendedores</template>
    </Header>
    <section class="container py-12 px-4 mx-auto">
        <div class="flex flex-col mt-6">
            <Table>
                <template #cols>
                    <th scope="col">
                        ID
                    </th>

                    <th scope="col">
                        Nome
                    </th>

                    <th scope="col">E-mail</th>

                    <th scope="col" class="relative py-3.5 px-4">
                        <span class="sr-only">Edit</span>
                    </th>
                </template>
                <template #rows>
                    <tr v-for="seller in sellers" :key="seller.id">
                        <td>
                            {{seller.id}}
                        </td>
                        <td >
                            {{seller.name}}
                        </td>
                        <td>
                            {{seller.email}}
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
