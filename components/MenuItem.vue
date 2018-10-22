<template>
  <div class="menu-box">
    <nuxt-link :to="linkPath">
      <div class="menu-item-container">
        <div class="menu-icon-area">
          <i :class="iconClass"/>
        </div>
        <div class="menu-text-area">
          <h3 class="menu-title">{{ title }}</h3>
          <p class="menu-sub-title">{{ subTitle }}</p>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'MenuItem',
  props: ['linkPath', 'title', 'subTitle', 'iconClass']
}
</script>

<style>
.menu-box
{
  width: 50%;
  padding: 10px 20px;
}
.menu-box a
{
  height: 100%;
}
.menu-item-container
{
  display: flex;
  flex-direction: row;
  word-break: break-word;
}
.menu-icon-area
{
  margin: 10px 20px;
}
.menu-icon-area > i
{
  font-size: 36px;
}
.menu-text-area
{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.menu-title
{
  color: #3d3d3d;
  font-size: 20px;
  margin-bottom: 4px;
}
.menu-sub-title
{
  color: #9b9b9b;
  font-size: 16px;
  text-align: left;
}
.menu-box a:hover .menu-text-area .menu-sub-title
{
  color: #565656;
}
</style>
