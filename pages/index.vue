<script setup>
const version = await $fetch(
  "https://ddragon.leagueoflegends.com/api/versions.json"
  ).catch((error) => error.data);
const liveVersion = version[0];
  
const data = await $fetch(
  `https://ddragon.leagueoflegends.com/cdn/${liveVersion}/data/pt_BR/champion.json`
).catch((error) => error.data);
const championsArray = ref(Object.values(data.data));


const searchResults = ref([]);
const searchTerm = ref('');
function championSearch() {
  searchResults.value = championsArray.value.filter(champion =>
    champion.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
}
</script>

<template>
  <div class="flex flex-col justify-center items-center mx-48 my-10 bg-[#141124] p-10 gap-4">
    <input type="text" v-model="searchTerm" name="" id="" class="w-[30%]"> 
    <button @click="championSearch" class="bg-white w-[30%]">Search</button>
  </div>
  
  <div class="flex flex-row justify-center flex-wrap gap-8 my-20 mx-48">
    <div
      v-if="searchResults.length > 0"
      v-for="champion in searchResults"
      :key="champion.id"
      class="itens-center bg-[#141124] p-2 rounded shadow-md cursor-pointer"
    >
    <a :href="`${liveVersion}/${champion.id}`">
      <img
        :src="`https://ddragon.leagueoflegends.com/cdn/${liveVersion}/img/champion/${champion.image.full}`"
        alt=""
      />
      <p class="text-center text-[#eae0cd]">{{ champion.name }}</p>
    </a>
    </div>
    <div
      v-else
      v-for="champion in championsArray"
      :key="champion.id"
      class="itens-center bg-[#141124] p-2 rounded shadow-md cursor-pointer"
    >
    <a :href="`${liveVersion}/${champion.id}`">
      <img
        :src="`https://ddragon.leagueoflegends.com/cdn/${liveVersion}/img/champion/${champion.image.full}`"
        alt=""
      />
      <p class="text-center text-[#eae0cd]">{{ champion.name }}</p>
    </a>
    </div>
  </div>
</template>

<style scoped >
  $primaryColor: #141124;
  $secondaryColor: #2b2845;
  $tertiaryColor: #19afd0;
  $textPrimary: #ebf0fd;
  $textSecondary: #8186a3;
</style>
