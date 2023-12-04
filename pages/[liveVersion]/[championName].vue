<script setup>
const route = useRoute();
let skinsArray = [];
const liveVersion = route.params.liveVersion;

const loadedChampion = await $fetch(
  `http://ddragon.leagueoflegends.com/cdn/${liveVersion}/data/en_US/champion/${route.params.championName}.json`
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
      iconURL: `https://ddragon.leagueoflegends.com/cdn/${liveVersion}/img/champion/${
        skin.name == "default" ? route.params.championName : ""
      }.png`,
    };
    skinsArray.push(loadSkin);
  });
}
console.log(championInfo);
console.log(skinsArray);

let selectedSkin = ref(0);
let selectedSpell = ref(championInfo.spells[0]);

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
console.log(championInfo.spells);
console.log(championInfo.key);

function spellsOrganizer() {
  const passive = {
    id: championInfo.passive.image.full.replace(".png", ""),
    name: championInfo.passive.name,
    description: championInfo.passive.description,
    image: {
      full: championInfo.passive.image.full,
      group: championInfo.passive.image.group,
      sprite: championInfo.passive.sprite,
    },
  };
  championInfo.spells.unshift(passive);
  console.log(championInfo);
}
spellsOrganizer();
function baixarImagem() {
    var link = document.createElement("a");
    link.download = "Akali_0.jpg";
    link.href = "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Akali_0.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
      class="flex flex-col justify-end w-full md:min-h-[500px] lg:min-h-[650px] xl:min-h-[800px] 2xl:min-h-[900px] bg-gradient-to-t from-[#141124] to-transparent"
    >
    <!-- <button class="absolute top-8 mx-24">
      <IconsLeftArrow class="w-[70px] h-[70px]"></IconsLeftArrow>
    </button> -->
    <a href="/" class="absolute top-0 left-0 px-4 py-1 bg-[#131023] text-[#90703b] rounded-br-md font-bold">
      <div class="flex flex-row items-center gap-2">
        <IconsLeftArrow class="w-[20px] h-[20px] md:w-[25px] md:h-[25px]"></IconsLeftArrow>
        <span class="text-xs md:text-sm">HOME</span>
      </div>
    </a>
      <div class="flex flex-col gap-12 md:flex-row mx-6 lg:mx-20 xl:mx-28 mb-16 mt-5 md:my-20 md:justify-between md:items-center">
        <div class="flex flex-col">
          <span class="text-[#90703b] text-5xl mt-2 md:mt-0 md:text-8xl lg:text-9xl">{{ championInfo.name }}</span>
          <span class="text-[#856533] text-xl md:text-2xl lg:text-3xl capitalize ml-3">{{
            championInfo.title
          }}</span>
        </div>
        <div class="flex flex-row mt-10 md:mt-0 md:flex-col gap-8 justify-between md:justify-center text-[#f0e6d2]">
          <div class="flex flex-row" v-for="(tag, index) in championInfo.tags">
            <div class="flex flex-row gap-4">
              <div>
                <IconsRoleAssassin
                  class="w-[40px] md:w-[70px]"
                  v-if="tag == 'Assassin'"
                ></IconsRoleAssassin>
                <IconsRoleFighter
                  class="w-[40px] md:w-[70px]"
                  v-if="tag == 'Fighter'"
                ></IconsRoleFighter>
                <IconsRoleMage
                  class="w-[40px] md:w-[70px]"
                  v-if="tag == 'Mage'"
                ></IconsRoleMage>
                <IconsRoleMarksman
                  class="w-[40px] md:w-[70px]"
                  v-if="tag == 'Marksman'"
                ></IconsRoleMarksman>
                <IconsRoleSupport
                  class="w-[40px] md:w-[70px]"
                  v-if="tag == 'Support'"
                ></IconsRoleSupport>
                <IconsRoleTank
                  class="w-[40px] md:w-[70px]"
                  v-if="tag == 'Tank'"
                ></IconsRoleTank>
              </div>
              <div class="flex flex-col">
                <span class="text-normal uppercase font-thin"
                  >{{ index + 1 }}ª Role</span
                >
                <span class="text-lg lg:text-xl uppercase font-bold">{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-[#141124] text-white mx-10">
    <div class="flex flex-row gap-8 text-[#c4b998] mx-4 xl:mx-32 2xl:mx-60">
      <div class="flex flex-col justify-evenly">
        <div class="flex flex-col xl:flex-row justify-between py-10 rounded items-center xl:gap-16">
          <p class="font-serif text-2xl text-justify font-thin">
            <span class="text-5xl md:text-7xl">{{ championInfo.lore[0] }}</span
            >{{ championInfo.lore.slice(1) }}
          </p>
          <img
            class="rounded-full h-auto hidden order-first xl:order-2 md:block md:w-44 border-[#a38447] border-[3px]"
            :src="skinsArray[0].iconURL"
            :alt="championInfo.name"
          />
        </div>
      </div>
    </div>
    <!-- Carosel -->
    <div class="flex flex-col gap-8 mx-2 xl:mx-32 2xl:mx-64 py-10 lg:py-16 xl:py-20 2xl:py-28">
      <!-- <img
        class="w-full h-[800px] rounded-lg border-[#856533] border-[3px]"
        :src="skinsArray[selectedSkin].splashURL"
        alt=""
      /> -->
      <div
        class="flex justify-left place-items-end p-10 w-full h-[200px] md:h-[400px] lg:h-[600px] xl:h[650px] 2xl:h-[700px] border-[#856533] border-[3px] bg-cover"
        :alt="selectedSkin.name"
        :style="{
          'background-image': 'url(' + skinsArray[selectedSkin].splashURL + ')',
        }"
      >
      
      <div class="flex flex-row justify-between w-full items-center">
        <span class="text-[#f0e6d2] text-2xl md:text-4xl">{{
          skinsArray[selectedSkin].name}}
        </span>
        <div class="flex flex-row gap-4 mt-4">
          <a :href="skinsArray[selectedSkin].splashURL" target="_blank">
            <IconsDownload class="w-8 h-8"></IconsDownload>
          </a>
          <a :href="skinsArray[selectedSkin].loadSplashURL" target="_blank">
            <IconsMobileDownload class="w-8 h-8"></IconsMobileDownload>
          </a>
        </div>

      </div>
      </div>
      <div class="flex flex-row gap-4 justify-between">
        <button @click="scrollElement('left')">
          <img src="../../assets/icons/leftArrow.svg" alt="" />
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
                  'w-[170px] h-[170px] grayscale-0':
                    skinsArray[selectedSkin].id === skin.id,
                }"
                :alt="skin.name"
                :style="{
                  'background-image': 'url(' + skin.loadSplashURL + ')',
                }"
                
              ></div>
            </div>
          </div>
        </div>
        <button @click="scrollElement('right')">
          <img src="../../assets/icons/rightArrow.svg" alt="" />
        </button>
      </div>
    </div>
    <!--Skills-->
    <div class="flex flex-col lg:flex-row mx-2 md:mx-10 xl:mx-32 2xl:mx-64 py-10 gap-10 justify-between items-center">
      <div class="flex flex-col lg:w-[40%] gap-5">
        <div class="flex flex-row justify-between">
          <div
            v-for="(spell, index) in championInfo.spells"
            :key="spell.id"
            class="flex flex-col"
          >
            <div
              class="bg-cover w-[60px] h-[60px] md:w-[70px] md:h-[70px] border-[3px] border-[#282820] grayscale"
              :alt="spell.name"
              :style="{
                'background-image': `url(https://ddragon.leagueoflegends.com/cdn/${liveVersion}/img/${spell.image.group}/${spell.id}.png)`,
              }"
              :class="{
                'border-[#856533] grayscale-0': selectedSpell.id == spell.id,
              }"
              @click="selectedSpell = spell"
            >
              <span
                class="font-extrabold text-[#c1b696] relative top-[80%]"
                style="-webkit-text-stroke: 1.5px black"
              >
                {{
                  index == 0
                    ? "P"
                    : index == 1
                    ? "Q"
                    : index == 2
                    ? "W"
                    : index == 3
                    ? "E"
                    : "R"
                }}
              </span>
            </div>
          </div>
        </div>
        <Separator></Separator>
        <div class="flex flex-col gap-4 lg:min-h-[200px] xl:min-h-[280px] 2xl:min-h-[350px] text-[#f2f2f2]">
          <span class="text-4xl">{{ selectedSpell.name }}</span>
          <p class="text-justify text-xl whitespace-pre-line">{{
            selectedSpell.description.replace(/<br\s*\/?>/gi, '\n')
          }}</p>
        </div>
        <Separator></Separator>
        <!-- <div class="flex flex-col" v-if="selectedSpell.image.group != 'passive'">
          <div class="flex flex-row">
            <IconsHourglass></IconsHourglass>
            <span v-for="cd in selectedSpell.cooldown">{{ cd }}/</span>
          </div>
          <div class="flex flex-row">
            <IconsWater></IconsWater>
            <span v-for="cost in selectedSpell.cost">{{ cost }}/</span>
          </div>
          <div class="flex flex-row">
            <IconsFire></IconsFire>
            <span v-for="effect in selectedSpell.effect[1]">{{ effect }}/</span>
          </div>
          <div class="flex flex-row">
            <IconsClover></IconsClover>
            <span v-for="range in selectedSpell.range">{{ range }}/</span>
          </div>
        </div> -->
      </div>
      <div
        class="bg-gradient-to-tr from-[#605336] to-[#bfa57d] p-1 w-[321px] h-[221px] md:w-[600px] md:h-[412px] lg:w-[500px] lg:h-[330px] xl:w-[600px] xl:h-[412px] 2xl:w-[750px] 2xl:h-[514px]"
      >
        <video
          class="bg-cover rounded"
          id="videoPlayer"
          :src="`https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${championInfo.key.padStart(
            4,
            '0'
          )}/ability_${championInfo.key.padStart(4, '0')}_${
            selectedSpell.id.includes('P')
              ? 'P'
              : selectedSpell.id.includes('Q')
              ? 'Q'
              : selectedSpell.id.includes('W')
              ? 'W'
              : selectedSpell.id.includes('E')
              ? 'E'
              : 'R'
          }1.webm?autoplay=1&mute=1&showinfo=0&controls=1`"
          autoplay
          muted
          loop
        ></video>
      </div>
    </div>

    <!--Pros Contras-->
    <div class="flex flex-col mx-2 md:mx-10 xl:mx-32 2xl:mx-64 py-10 lg:py-16 xl:py-16 2xl:py-28">
      <div class="flex flex-col lg:flex-row gap-12 lg:gap-0 justify-between">
        <div class="flex flex-col lg:w-[47%] gap-8">
          <span class="text-3xl md:text-4xl">Ally Tips</span>
          <div class="flex flex-col gap-4">
            <div
              class="flex flex-row items-center gap-4"
              v-for="(tip, index) in championInfo.allytips"
            >
              <span class="">
                {{ index + 1 }}
              </span>
              <div>
                <p class="text-lg text-justify text-[#e9e0cf]">{{ tip }}</p>
                <Separator></Separator>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col lg:w-[47%] gap-8">
          <span class="text-3xl lg:text-4xl">Enemy Tips</span>
          <div class="flex flex-col gap-4">
            <div
              class="flex flex-row items-center gap-4"
              v-for="(tip, index) in championInfo.enemytips"
            >
              <span class="">
                {{ index + 1 }}
              </span>
              <div>
                <p class="text-lg text-justify text-[#e9e0cf]">{{ tip }}</p>
                <Separator></Separator>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
