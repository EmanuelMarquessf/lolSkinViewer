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
      class="flex flex-col justify-end w-full min-h-[900px] bg-gradient-to-t from-[#141124] to-transparent"
    >
      <div class="flex flex-row mx-28 my-20 justify-between items-center">
        <div class="flex flex-col">
          <span class="text-[#90703b] text-9xl">{{ championInfo.name }}</span>
          <span class="text-[#856533] text-3xl capitalize ml-3">{{
            championInfo.title
          }}</span>
        </div>
        <div class="flex flex-col gap-8 justify-center text-[#f0e6d2]">
          <div class="flex flex-row" v-for="(tag, index) in championInfo.tags">
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
                <span class="text-normal uppercase font-thin"
                  >{{ index + 1 }}ª Role</span
                >
                <span class="text-xl uppercase font-bold">{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-[#141124] text-white">
    <div class="flex flex-row gap-8 text-[#c4b998] mx-60">
      <div class="flex flex-col justify-evenly">
        <div class="flex flex-row justify-between py-10 rounded items-center">
          <p class="font-serif text-2xl text-justify font-thin w-[83%]">
            <span class="text-7xl">{{ championInfo.lore[0] }}</span
            >{{ championInfo.lore.slice(1) }}
          </p>
          <img
            class="rounded-full h-auto w-44 border border-[#a38447] border-[3px]"
            :src="skinsArray[0].iconURL"
            :alt="championInfo.name"
          />
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-8 mx-64 py-28">
      <!-- <img
        class="w-full h-[800px] rounded-lg border-[#856533] border-[3px]"
        :src="skinsArray[selectedSkin].splashURL"
        alt=""
      /> -->
      <div
        class="flex justify-left place-items-end p-10 w-full h-[700px] border-[#856533] border-[3px] bg-cover"
        :alt="selectedSkin.name"
        :style="{
          'background-image': 'url(' + skinsArray[selectedSkin].splashURL + ')',
        }"
      >
      
      <div class="flex flex-row justify-between w-full items-center">
        <span class="text-[#f0e6d2] text-4xl">{{
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
    <div class="flex flex-row mx-64 py-10 gap-10 justify-between items-center">
      <div class="flex flex-col w-[40%] gap-5">
        <div class="flex flex-row justify-between">
          <div
            v-for="(spell, index) in championInfo.spells"
            :key="spell.id"
            class="flex flex-col"
          >
            <div
              class="w-[70px] h-[70px] border-[3px] border-[#282820] grayscale"
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
        <div class="flex flex-col gap-4 min-h-[350px] text-[#f2f2f2]">
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
        class="w-[750px] h-[515px] bg-gradient-to-tr from-[#605336] to-[#bfa57d] p-1"
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
    <div class="flex flex-col mx-64 py-28">
      <div class="flex flex-row justify-between">
        <div class="flex flex-col w-[47%] gap-8">
          <span class="text-4xl">Ally Tips</span>
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
        <div class="flex flex-col w-[47%] gap-8">
          <span class="text-4xl">Enemy Tips</span>
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
