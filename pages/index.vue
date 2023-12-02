<script setup lang="ts">
const version = await $fetch(
  "https://ddragon.leagueoflegends.com/api/versions.json"
).catch((error) => error.data);
const liveVersion = version[0];

const data = await $fetch(
  `https://ddragon.leagueoflegends.com/cdn/${liveVersion}/data/pt_BR/champion.json`
).catch((error) => error.data);
const championsArray = Object.values(data.data);

console.log(data);
console.log(championsArray);
</script>

<template>
  <div class="flex flex-col justify-center items-center mx-48 my-10 bg-[#141124] p-10 gap-4">
    <input type="password" name="" id="" class="w-[30%]"> 
    <button @click="" class="bg-white w-[30%]">Search</button>
  </div>
  
  <div class="flex flex-row justify-center flex-wrap gap-8 my-20 mx-48">
    <div
      v-for="champion in championsArray"
      :key="champion.id"
      class="itens-center bg-[#141124] p-2 rounded shadow-md cursor-pointer"
    >
    <a :href="`${liveVersion}/${champion.id}`">
      <img
        :src="`https://ddragon.leagueoflegends.com/cdn/${liveVersion}/img/champion/${champion.image.full}`"
        alt=""
      />
      <p class="text-center text-white">{{ champion.name }}</p>
    </a>
    </div>
  </div>
</template>

<style>
$primaryColor: #141124;
$secondaryColor: #2b2845;
$tertiaryColor: #19afd0;
$textPrimary: #ebf0fd;
$textSecondary: #8186a3;
</style>
