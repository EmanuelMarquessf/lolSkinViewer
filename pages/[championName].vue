<script setup>
const route = useRoute();
let skinsArray = [];

const loadedChampion = await $fetch(
  `http://ddragon.leagueoflegends.com/cdn/13.6.1/data/en_US/champion/${route.params.championName}.json`
).catch((error) => error.data);
const championInfo = loadedChampion.data[route.params.championName];
skinsOrganizer();

function skinsOrganizer() {
  let i = 0;
  const auxSkins = championInfo.skins;
  auxSkins.forEach((skin) => {
    const loadSkin = {
      num: i++,
      id: skin.id,
      name: skin.name == "default" ? `${championInfo.name}` : skin.name,
      chromas: skin.chromas,
      splashURL: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${route.params.championName}_${skin.num}.jpg`,
      loadSplashURL: `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${route.params.championName}_${skin.num}.jpg`,
      iconURL: `https://ddragon.leagueoflegends.com/cdn/13.23.1/img/champion/${
        skin.name == "default" ? route.params.championName : ""
      }.png`,
    };
    skinsArray.push(loadSkin);
  });
}
console.log(championInfo);
console.log(skinsArray);

let selectedSkin = ref(0);

function scrollElement(position) {
  const element = document.getElementById("scroll");

  if (position === "left") {
    element.scrollTo({
      left: element.scrollLeft - 150,
      behavior: "smooth",
    });
  } else {
    const maxScrollLeft = element.scrollWidth - element.clientWidth;
    element.scrollTo({
      left: Math.min(element.scrollLeft + 150, maxScrollLeft),
      behavior: "smooth",
    });
  }
}
</script>
<template>
  <!-- <header class="bg-[#141124] w-full p-10 fixed">

  </header> -->
  <div
    class="bg-cover bg-no-repeat bg-right-top"
    :style="{ 'background-image': 'url(' + skinsArray[0].splashURL + ')' }"
  >
    <div
      class="flex flex-col justify-end w-full min-h-[900px] bg-gradient-to-t from-[#141124] to-transparent"
    >
      <div class="flex flex-col mx-28 my-20 gap-4">
        <span class="text-[#90703b] text-9xl">{{ championInfo.name }}</span>
        <span class="text-[#856533] text-3xl capitalize ml-3">{{
          championInfo.title
        }}</span>
      </div>
    </div>
  </div>
  <div class="bg-[#141124] text-white">
    <div class="flex flex-row gap-8 text-[#c4b998] mx-60">
      <div class="flex flex-col justify-evenly">
        <div class="flex flex-row justify-between py-10 rounded items-center">
          <p class="font-serif text-2xl text-justify font-thin w-[85%]">
            <span class="text-7xl">{{ championInfo.lore[0] }}</span
            >{{ championInfo.lore.slice(1) }}
          </p>
          <img
            class="rounded-full h-auto w-44 border border-[#a38447] border-[3px]"
            :src="skinsArray[0].iconURL"
            alt=""
          />
        </div>
        <div class="flex flex-row gap-8">
          <div class="flex flex-row" v-for="tag in championInfo.tags">
            <div class="flex flex-row gap-4">
              <div>
                <IconsRoleAssassin
                  class="w-[70px]"
                  v-if="tag == 'Assassin'"
                ></IconsRoleAssassin>
                <IconsRoleFighter
                  class="w-[70px]"
                  v-if="tag == 'Fighter'"
                ></IconsRoleFighter>
                <IconsRoleMage
                  class="w-[70px]"
                  v-if="tag == 'Mage'"
                ></IconsRoleMage>
                <IconsRoleMarksman
                  class="w-[70px]"
                  v-if="tag == 'Marksman'"
                ></IconsRoleMarksman>
                <IconsRoleSupport
                  class="w-[70px]"
                  v-if="tag == 'Support'"
                ></IconsRoleSupport>
                <IconsRoleTank
                  class="w-[70px]"
                  v-if="tag == 'Tank'"
                ></IconsRoleTank>
              </div>
              <div class="flex flex-col">
                <span class="text-normal uppercase font-thin">Roles</span>
                <span class="text-xl uppercase font-bold">{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col jus gap-8 mx-64 py-10">
      <!-- <img
        class="w-full h-[800px] rounded-lg border-[#856533] border-[3px]"
        :src="skinsArray[selectedSkin].splashURL"
        alt=""
      /> -->
      <div
        class="flex justify-left place-items-end p-10 w-full h-[700px] border-[#856533] border-[3px] bg-cover"
        :style="{
          'background-image': 'url(' + skinsArray[selectedSkin].splashURL + ')',
        }"
      >
        <span class="text-[#f0e6d2] text-4xl">{{
          skinsArray[selectedSkin].name
        }}</span>
      </div>
      <div class="flex flex-row gap-4 justify-between">
        <button @click="scrollElement('left')">
          <img src="../assets/icons/leftArrow.svg" alt="" />
        </button>
        <div
          id="scroll"
          class="w-full flex flex-row items-center overflow-x-hidden snap-x gap-7"
        >
          <div v-for="skin in skinsArray" :key="skin.id">
            <div
              class="flex flex-col border-[#3c3c41] border-[3px] rounded"
              @click="selectedSkin = skin.num"
              :class="{
                'border-[#856533]': skinsArray[selectedSkin].id === skin.id,
              }"
            >
              <div
                class="w-[150px] h-[150px] bg-top bg-cover p-4 snap-center grayscale"
                :class="{
                  'w-[170px] h-[170px] grayscale-0': skinsArray[selectedSkin].id === skin.id,
                }"
                :style="{
                  'background-image': 'url(' + skin.loadSplashURL + ')',
                }"
              ></div>
            </div>
          </div>
        </div>
        <button @click="scrollElement('right')">
          <img src="../assets/icons/rightArrow.svg" alt="" />
        </button>
      </div>
    </div>
  </div>
</template>
