<script setup>
import { onMounted, ref, reactive, defineAsyncComponent } from 'vue';
import Header from '../components/Common/Header.vue';
import Table from '../components/Common/Table.vue';
import Pagination from '../components/Common/Pagination.vue';
import api from '../services/axios';

const Form = ref(null);

const sellers = ref([]);
const selectedSeller = reactive({
  id: null,
  name: '',
  email: ''
});
const showForm = ref(false);

onMounted(async () => {
  try {
    const response = await api.get('/seller');
    sellers.value = response.data;
  } catch (error) {
    console.log('Erro ao buscar vendedores:', error);
  }

  Form.value = defineAsyncComponent(() => import('../components/Seller/Form.vue'));
});

const editSeller = (seller) => {
  selectedSeller.id = seller.id;
  selectedSeller.name = seller.name;
  selectedSeller.email = seller.email;
  showForm.value = true;
};

const deleteSeller = async (seller) => {
  const isConfirmed = confirm(`Tem certeza de que deseja deletar o vendedor ${seller.name}?`);

  if (isConfirmed) {
    try {
      await api.delete(`/seller/${seller.id}`);
      // sales.value = sales.value.filter(s => s.id !== seller.id);
    } catch (error) {
      console.error('Erro ao deletar o vendedor:', error);
    }
  }
};

const handleSellerUpdated = (updatedSeller) => {
  const index = sellers.value.data.findIndex((s) => s.id === updatedSeller.data.id);
  if (index !== -1) {
    sellers.value.data[index] = updatedSeller.data;
  }
  showForm.value = false;
};

const hideForm = () => {
  showForm.value = false;
};

const addSeller = (seller) => {
  sellers.value.data[seller.id] = seller;
  showForm.value = false;
}
</script>

<template>
  <Header>
    <template #title>Vendedores</template>
    <template #description>Aqui você pode visualizar todos os vendedores</template>
    <template #counter>{{ sellers?.data?.length || 0 }} itens</template>
    <template #button>
      <button type="button" @click="showForm = true" class="px-4 py-2 bg-blue-500 text-white rounded-md">
        Cadastrar
      </button>
    </template>
  </Header>

  <section class="container pb-12 px-4 mx-auto">
    <!-- Exibir a tabela ou o formulário com base no estado de 'showForm' -->
    <div v-if="!showForm">
        <Table>
            <template #cols>
                <th scope="col">ID</th>
                <th scope="col">Nome</th>
                <th scope="col">E-mail</th>
                <th scope="col" class="relative py-3.5 px-4">
                <span class="sr-only">Edit</span>
                </th>
            </template>

            <template #rows>
                <tr v-for="seller in sellers.data" :key="seller.id">
                  <td>{{ seller.id }}</td>
                  <td>{{ seller.name }}</td>
                  <td>{{ seller.email }}</td>
                  <td class="flex flex-row gap-4 justify-end">
                    <button
                      @click="editSeller(seller)"
                      class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md uppercase transition-colors duration-200 hover:bg-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                      Editar
                    </button>

                    <button
                      @click="deleteSeller(seller)"
                      class="px-4 py-2 bg-red-300 text-red-700 rounded-md uppercase transition-colors duration-200 hover:bg-red-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
            </template>
        </Table>
        <Pagination></Pagination>
    </div>

    <transition name="fade">
      <div v-if="showForm" class="mt-6">
        <Form
          :seller="selectedSeller"
          @updated="handleSellerUpdated"
          @sellerCreated="addSeller"
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