<template>
  <div class="article-timestamp">
    <div class="timestamp-container">
      <i class="far fa-clock"/>
        <p>{{ createdAt }}</p>
    </div>
    <div class="timestamp-container">
      <i class="fas fa-clock"/>
        <p>{{ updatedAt }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleTimestamp',
  props: ['createdAt', 'updatedAt']
}
</script>

<style>
.article-timestamp
{
  margin-top: 1.5rem;
  padding-top: 0.5rem;
  border-top: solid 1px #aaaaaa;
  color: #aaaaaa;
  display: flex;
  flex-direction: row;
}
.timestamp-container
{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-right: 1rem;
}
.timestamp-container i
{
  margin-right: 0.4rem;
}
</style>
