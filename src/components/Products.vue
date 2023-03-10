<script setup>
import { ref, onMounted } from 'vue';
// ref 就是 Vue 2 時的 data
import axios from 'axios';
import router from '../router';
import { isMemberExpressionBrowser } from '@vue/compiler-core';

const base = '/-vue-w2'

// data
const apiUrl = 'https://vue3-course-api.hexschool.io/v2/';
const apiPath = 'cryptalk';
let products = ref([]);
let tempProduct = ref({});

// methods
async function checkAdmin() {
  const url = `${apiUrl}/api/user/check`;
  await axios.post(url).then(() => {
    getData()
  })
    .catch(err => {
      alert('請重新登入')
      router.push(base)
    })
}

async function getData() {
  const url = `${apiUrl}/api/${apiPath}/admin/products`;
  await axios.get(url).then((res) => {
    products.value = res.data.products
    console.log(res.data.products)
  })
    .catch(err => {
      alert(err.response.data.message)
    })
}

function logout() {
  document.cookie = "hexToken='';expires=0; path=/";
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
  axios.defaults.headers.common.Authorization = token;
  checkAdmin()
}

function showDetails(item) {
  tempProduct.value = item
}

onMounted(() => {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
  axios.defaults.headers.common.Authorization = token;
  checkAdmin()
})

</script>


<template>
  <nav class="bg-primary p-2 d-flex">
    <h1 class="text-white px-2">LOGO</h1>
    <button class="mx-5 btn btn-dark" @click="logout">
      登出
    </button>
  </nav>
  <div class="container">
    <div class="row py-3">
      <div class="col-md-6">
        <h2>產品列表</h2>
        <table class="table table-hover mt-4">
          <thead>
            <tr>
              <th width="150">產品名稱</th>
              <th width="120">
                原價
              </th>
              <th width="120">
                售價
              </th>
              <th width="150">
                是否啟用
              </th>
              <th width="120">
                查看細節
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item) in products" :key="item.id">
              <td width="150">{{ item.title }}</td>
              <td width="120">
                {{ item.origin_price }}
              </td>
              <td width="120">
                {{ item.price }}
              </td>
              <td width="150">
                <span v-if="item.is_enabled" class="text-success">啟用</span>
                <span v-else>未啟用</span>
              </td>
              <td width="120">
                <button type="button" class="btn btn-primary" @click="showDetails(item)">查看細節</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p>目前有 <span>{{ products.length }}</span> 項產品</p>
      </div>
      <div class="col-md-6">
        <h2>單一產品細節</h2>
        <template v-if="tempProduct.title">
          <div class="card mb-3">
            <img :src="tempProduct.imageUrl" class="card-img-top primary-image" alt="主圖">
            <div class="card-body">
              <h5 class="card-title">
                {{ tempProduct.title }}
                <span class="badge bg-primary ms-2">{{ tempProduct.category }}</span>
              </h5>
              <p class="card-text">商品描述：{{ tempProduct.description }}</p>
              <p class="card-text">商品內容：{{ tempProduct.content }}</p>
              <div class="d-flex">
                <p class="card-text me-2">{{ tempProduct.price }}</p>
                <p class="card-text text-secondary"><del>{{ tempProduct.origin_price }}</del></p>
                {{ tempProduct.unit }} / 元
              </div>
            </div>
          </div>
          <template v-for="(image, id) in tempProduct.imagesUrl" :key="id">
            <img v-if="image" :src="image" :alt="`多圖 ${id + 1}`" class="images m-2">
          </template>
        </template>
        <p v-else class="text-secondary">請選擇一個商品查看</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
img {
  object-fit: contain;
  max-width: 100%;
}

.primary-image {
  height: 300px;
}

.images {
  height: 150px;
}
</style>