<script>
  import Header from "./Header.svelte";
  import "./styles.sass";
</script>

<div class="flex flex-col min-h-screen">
  <!-- <Header /> -->

  <main class="">
    <slot />
  </main>

  <footer />
</div>

<style>
  /* main { */
  /*   flex: 1; */
  /*   display: flex; */
  /*   flex-direction: column; */
  /*   margin: 0 auto; */
  /**/
  /*   padding: 1rem; */
  /*   width: 100%; */
  /*   max-width: 64rem; */
  /* } */

  /* footer { */
  /*   display: flex; */
  /*   flex-direction: column; */
  /*   justify-content: center; */
  /*   align-items: center; */
  /*   padding: 12px; */
  /* } */
  /**/
  /* footer a { */
  /*   font-weight: bold; */
  /* } */
  /**/
  /* @media (min-width: 480px) { */
  /*   footer { */
  /*     padding: 12px 0; */
  /*   } */
  /* } */
</style>
