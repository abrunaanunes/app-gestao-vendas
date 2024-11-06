<script setup>
import { onMounted, ref, reactive, defineAsyncComponent } from 'vue';
import Header from '../components/Common/Header.vue';
import Table from '../components/Common/Table.vue';
import Pagination from '../components/Common/Pagination.vue';
import api from '../services/axios';

const Form = ref(null);

const sales = ref([]);
const selectedSale = reactive({
  id: null,
  value: '',
  sold_at: '',
  seller: {
    id: null,
    name: ''
  }
});
const showForm = ref(false);

onMounted(async () => {
  try {
    const response = await api.get('/sale');
    sales.value = response.data;
  } catch (error) {
    console.log('Erro ao buscar vendas:', error);
  }

  Form.value = defineAsyncComponent(() => import('../components/Sale/Form.vue'));
});

const editSale = (sale) => {
  selectedSale.id = sale.id;
  selectedSale.value = sale.value;
  selectedSale.sold_at = sale.sold_at;
  selectedSale.seller.id = sale.seller.id;
  selectedSale.seller.name = sale.seller.name;
  showForm.value = true;
};

const deleteSale = async (sale) => {
  const isConfirmed = confirm(`Tem certeza de que deseja deletar a venda ${sale.id}?`);

  if (isConfirmed) {
    try {
      await api.delete(`/sale/${sale.id}`);
      // sales.value = sales.value.filter(s => s.id !== sale.id);
    } catch (error) {
      console.error('Erro ao deletar o venda:', error);
    }
  }
};

const handleSaleUpdated = (updatedSale) => {
  const index = sales.value.data.findIndex((s) => s.id === updatedSale.id);
  if (index !== -1) {
    sales.value.data[index] = updatedSale;
  }
  showForm.value = false;
};

const hideForm = () => {
  showForm.value = false;
};

const addSale = (sale) => {
  sales.value.data[sale.id] = sale;
  showForm. value = false;
}

</script>

<template>
  <Header>
    <template #title>Vendas</template>
    <template #description>Aqui você pode visualizar todas as vendas</template>
    <template #counter>{{ sales?.data?.length || 0 }} itens</template>
    <template #button>
      <button type="button" @click="showForm = true" class="px-4 py-2 bg-blue-500 text-white rounded-md">
        Cadastrar
      </button>
    </template>
  </Header>

  <section class="container pb-12 px-4 mx-auto">
    <!-- Exibe a tabela de vendas ou o formulário de edição -->
    <div v-if="!showForm">
      <Table>
        <template #cols>
          <th scope="col">ID</th>
          <th scope="col">Valor</th>
          <th scope="col">Data</th>
          <th scope="col">Vendedor</th>
          <th scope="col" class="relative py-3.5 px-4">
            <span class="sr-only">Editar</span>
          </th>
        </template>

        <template #rows>
          <tr v-for="sale in sales.data" :key="sale.id">
            <td>{{ sale.id }}</td>
            <td>{{ sale.value }}</td>
            <td>{{ sale.sold_at }}</td>
            <td>{{ sale.seller.name }}</td>
            <td class="flex flex-row gap-4 justify-end">
              <button
                @click="editSale(sale)"
                class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md uppercase transition-colors duration-200 hover:bg-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Editar
              </button>

              <button
                @click="deleteSale(sale)"
                class="px-4 py-2 bg-red-300 text-red-700 rounded-md uppercase transition-colors duration-200 hover:bg-red-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Deletar
              </button>
            </td>
          </tr>
        </template>
      </Table>

      <Pagination />
    </div>

    <transition name="fade">
      <div v-if="showForm" class="mt-6">
        <!-- Exibe o formulário de edição com os dados da venda selecionada -->
        <Form
          :sale="selectedSale"
          @saleCreated="addSale"
          @cancel="hideForm"
        />
      </div>
    </transition>
  </section>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active em <2.1.8 */ {
  opacity: 0;
}
</style>
