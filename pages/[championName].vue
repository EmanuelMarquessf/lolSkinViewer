<script setup>
const route = useRoute();
let skinsArray = [];

const loadedChampion = await $fetch(
  `http://ddragon.leagueoflegends.com/cdn/13.6.1/data/en_US/champion/${route.params.championName}.json`
).catch((error) => error.data);
const championInfo = loadedChampion.data[route.params.championName];
skinsOrganizer();

function skinsOrganizer() {
  const auxSkins = championInfo.skins;
  auxSkins.forEach((skin) => {
    const loadSkin = {
      num: skin.num,
      id: skin.id,
      name: skin.name == "default" ? `${championInfo.name}` : skin.name,
      chromas: skin.chromas,
      splashURL: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${skin.name == "default" ? route.params.championName : skin.name
      }_${skin.num}.jpg`,
    };
    skinsArray.push(loadSkin);
  });
}
console.log(championInfo)
console.log(skinsArray)
</script>
<template>
  <!-- <header class="bg-[#141124] w-full p-10 fixed">

  </header> -->
  <div class="bg-cover bg-no-repeat bg-right-top" :style="{ 'background-image': 'url(' + skinsArray[0].splashURL + ')' }">
    <div class="flex flex-col justify-end w-full min-h-[900px] bg-gradient-to-t from-[#141124] to-transparent">
      <div class="flex flex-col m-20 gap-4">
        <span class="text-white text-9xl">{{ championInfo.name }}</span>
        <span class="text-white text-3xl capitalize ml-3">{{ championInfo.title }}</span>
      </div>
    </div>
  </div>
  <div class="bg-[#141124]">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut nihil adipisci ipsam cupiditate! Ducimus cum quia, maxime voluptas, dolores eum modi rem debitis culpa vel architecto at, doloremque aspernatur ratione!
  </div>
</template>
