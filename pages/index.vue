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

watch(
  () => searchTerm.value,
  async () => {
    if(searchTerm.value.length >= 3 || searchTerm.value.length == 0){
      championSearch()
    }
  }
);

</script>

<template>
  <div class="flex flex-col  lg:flex-row gap-8 lg:gap-0 justify-between items-center my-10 m-4 mx-4 md:mx-10 xl:mx-28 2xl:mx-64">
    <div class="flex flex-col gap-4">
      <span class="text-center lg:text-left text-5xl md:text-6xl font-sans text-[#90703b] uppercase">League of Legends</span>
      <span class="text-center lg:text-left text-xl md:text-3xl font-thin font-serif text-[#856533]">Champion Select</span>
    </div>
    <div class="relative">
      <div class="absolute inset-y-0 flex items-center ps-3 pointer-events-none">
        <button @click="championSearch">
          <IconsSearch></IconsSearch>
        </button>
      </div>
      <input type="search" v-model="searchTerm" class="block w-[250px] md:w-[400px] p-4 ps-12 text-lg text-[#e4dac8] border border-b-[#90703b] border-t-0 border-l-0 border-r-0 bg-[#141124]" placeholder="Find a Champion">
    </div>
  </div>
  <!-- <Separator class="mx-4 md:mx-10 xl:mx-28 2xl:mx-64"></Separator> -->
  <div class="flex flex-row justify-center flex-wrap gap-8 my-10 md:my-20 mx-4 md:mx-10 xl:mx-28 2xl:mx-64">
    <div
      v-if="searchResults.length > 0"
      v-for="champion in searchResults"
      :key="champion.id"
      class="itens-center bg-[#0a0a0b] rounded shadow-md cursor-pointer"
    >
    <a :href="`${liveVersion}/${champion.id}`">
      <div class="flex flex-col justify-end  bg-top bg-cover w-[100px] h-[100px] md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[363px]"
      :style="{
        'background-image': `url(https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg)`,
      }"
      >
      <div class="flex flex-col justify-center itens-center w-full h-[20px] md:h-[25px] lg:h-[50px] bg-black/80 content-center">
        <span class="text-center text-[#eae0cd] text-lg md:text-xl lg:text-2xl">{{ champion.name }}</span>

      </div>
      </div>
    </a>
    </div>
    <div
      v-else
      v-for="champion in championsArray"
      :key="champion.id"
      class="itens-center bg-[#0a0a0b] rounded shadow-md cursor-pointer"
    >
    <a :href="`${liveVersion}/${champion.id}`">
      <div class="flex flex-col justify-end  bg-top bg-cover w-[100px] h-[100px] md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[363px]"
      :style="{
        'background-image': `url(https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg)`,
      }"
      >
      <div class="flex flex-col justify-center itens-center w-full h-[20px] md:h-[25px] lg:h-[50px] bg-black/80 content-center">
        <span class="text-center text-[#eae0cd] text-lg md:text-xl lg:text-2xl">{{ champion.name }}</span>

      </div>
      </div>
    </a>
    </div>
  </div>
  <Footer></Footer>
</template>

<style scoped >
  $primaryColor: #141124;
  $secondaryColor: #2b2845;
  $tertiaryColor: #19afd0;
  $textPrimary: #ebf0fd;
  $textSecondary: #8186a3;
</style>
