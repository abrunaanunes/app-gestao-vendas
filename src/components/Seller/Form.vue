<script setup>
import { reactive, defineEmits } from 'vue';
import api from '../../services/axios';

const emit = defineEmits();

const props = defineProps({
  seller: {
    type: Object,
    default: null
  }
});

const form = reactive({
  id: props?.seller?.id || '',
  name: props?.seller?.name || '',
  email: props?.seller?.email || ''
});

const updateSale = async () => {
  if (props.seller?.id) {
    try {
      const response = await api.put(`/seller/${props.seller.id}`, form);
      emit('sellerUpdated', response.data);
    } catch (error) {
      console.error('Erro ao atualizar venda:', error);
    }
  }
};

const createSeller = async () => {
  try {
    const response = await api.post(`/seller`, form);
    emit('sellerCreated', response.data);
  } catch (error) {
    console.error('Erro ao criar venda:', error);
  }
};

const submitForm = () => {
  if (props?.seller?.id) {
    updateSeller();
  } else {
    createSeller();
  }
};
</script>

<template>
  <div class="mt-6 p-6 bg-white rounded-lg shadow-md">
    <h3 class="text-xl font-semibold mb-4">Editar Vendedor</h3>
    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700">Nome</label>
        <input
          type="text"
          id="name"
          v-model="form.name"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700">E-mail</label>
        <input
          type="email"
          id="email"
          v-model="form.email"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div class="flex justify-end space-x-2">
        <button
          type="button"
          @click="() => emit('cancel')"
          class="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
        >
          Cancelar
        </button>
        <button
          type="submit"
          class="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Atualizar
        </button>
      </div>
    </form>
  </div>
</template>
