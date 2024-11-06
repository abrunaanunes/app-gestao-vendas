<script setup>
import { ref, defineEmits, defineProps, reactive } from 'vue';
import api from '../../services/axios';

const emit = defineEmits();

const props = defineProps({
  sale: {
    type: Object,
    default: null
  }
});

const form = reactive({
  value: props?.sale?.value || '',
  sold_at: props?.sale?.sold_at || '',
  seller_id: props?.sale?.seller?.name || '',
})

const updateSale = async () => {
  if (props.sale?.id) {
    try {
      const response = await api.put(`/sale/${props.sale.id}`, form);
      emit('saleUpdated', response.data);
    } catch (error) {
      console.error('Erro ao atualizar venda:', error);
    }
  }
};

const createSale = async () => {
  try {
    const response = await api.post(`/sale`, form);
    emit('saleCreated', response.data);
  } catch (error) {
    console.error('Erro ao criar venda:', error);
  }
};

const submitForm = () => {
  if (props?.sale?.id) {
    updateSale();
  } else {
    createSale();
  }
};

</script>

<template>
  <div class="mt-6 p-6 bg-white rounded-lg shadow-md">
    <h3 class="text-xl font-semibold mb-4">Editar Venda</h3>
    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <label for="value" class="block text-sm font-medium text-gray-700">Valor</label>
        <input
          type="number"
          id="value"
          v-model="value"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div class="mb-4">
        <label for="soldAt" class="block text-sm font-medium text-gray-700">Data da Venda</label>
        <input
          type="date"
          id="soldAt"
          v-model="form.sold_at"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div class="mb-4">
        <label for="seller" class="block text-sm font-medium text-gray-700">Vendedor</label>
        <input
          type="text"
          id="seller"
          v-model="form.seller_id"
          :disabled="true"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
          Atualizar Venda
        </button>
      </div>
    </form>
  </div>
</template>
