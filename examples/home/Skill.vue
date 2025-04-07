<script setup>
const data = {
  Frontend: [{
    link: 'https://getbootstrap.com/docs/3.4/javascript/',
    icon: 'https://profilinator.rishav.dev/skills-assets/bootstrap-plain.svg',
    name: 'Bootstrap'
  }, {
    link: 'https://www.w3schools.com/css/',
    icon: 'https://profilinator.rishav.dev/skills-assets/css3-original-wordmark.svg',
    name: 'CSS3'
  }, {
    link: 'https://en.wikipedia.org/wiki/HTML5',
    icon: 'https://profilinator.rishav.dev/skills-assets/html5-original-wordmark.svg',
    name: 'HTML5'
  }, {
    link: 'https://www.electronjs.org/',
    icon: 'https://profilinator.rishav.dev/skills-assets/electron-original.svg',
    name: 'Electron'
  }, {
    link: 'https://vuejs.org/',
    icon: 'https://profilinator.rishav.dev/skills-assets/vuejs-original-wordmark.svg',
    name: 'Vue.js'
  }],
  Backend: [{
    link: 'https://www.cplusplus.com/',
    icon: 'https://profilinator.rishav.dev/skills-assets/cplusplus-original.svg',
    name: 'C++'
  }, {
    link: 'https://www.typescriptlang.org/',
    icon: 'https://profilinator.rishav.dev/skills-assets/typescript-original.svg',
    name: 'TypeScript'
  }, {
    link: 'https://www.php.net/',
    icon: 'https://profilinator.rishav.dev/skills-assets/php-original.svg',
    name: 'PHP'
  }, {
    link: 'https://www.java.com/',
    icon: 'https://profilinator.rishav.dev/skills-assets/java-original-wordmark.svg',
    name: 'Java'
  }, {
    link: 'https://nodejs.org/',
    icon: 'https://profilinator.rishav.dev/skills-assets/nodejs-original-wordmark.svg',
    name: 'Node.js'
  }, {
    link: 'https://www.python.org/',
    icon: 'https://profilinator.rishav.dev/skills-assets/python-original.svg',
    name: 'Python'
  }, {
    link: 'https://www.mysql.com/',
    icon: 'https://profilinator.rishav.dev/skills-assets/mysql-original-wordmark.svg',
    name: 'MySQL'
  }],
  DevOps: [{
    link: 'https://www.linux.org/',
    icon: 'https://profilinator.rishav.dev/skills-assets/linux-original.svg',
    name: 'Linux'
  }, {
    link: 'https://www.nginx.com/',
    icon: 'https://profilinator.rishav.dev/skills-assets/nginx-original.svg',
    name: 'Nginx'
  }, {
    link: 'https://git-scm.com/',
    icon: 'https://profilinator.rishav.dev/skills-assets/git-scm-icon.svg',
    name: 'Git'
  }]
}

</script>
<template>
  <div class="skill-container flex flex-col items-center">
    <div class="skill-group" v-for="group, key in data" :key="key">
      <el-space :size="20">
        <a v-for="item in group" :key="item.name" :href="item.link" target="_blank">
          <el-image :src="item.icon" :alt="item.name" style="width: 50px;height: 50px;" />
        </a>
      </el-space>
    </div>
  </div>
</template>
