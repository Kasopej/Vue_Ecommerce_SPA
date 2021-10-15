<template>
  <main class="home container-fluid px-3 py-5">
  <ProductSummary class="row row-cols-2 row-cols-md-4"/>
  </main>
</template>

<script>
// @ is an alias to /src

import ProductSummary from "@/components/product-summary";
export default {
  name: 'Home',
  components: {
    ProductSummary,
  }
}
</script>
