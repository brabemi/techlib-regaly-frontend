<template>
  <div class="pf-layout" id="app">
    <nav role="navigation" class="navbar navbar-pf">
      <div class="navbar-header">
        <a href="#/" class="navbar-brand navbar-brand-name">
          <b>Regaly</b>
        </a>
      </div>
      <!-- <div class="collapse navbar-collapse navbar-collapse-1">
        <ul class="nav navbar-nav navbar-primary">
          <li class="">
            <a href="#/get-started">Get Started</a>
          </li>
        </ul>
        <ul class="nav navbar-nav navbar-utility">
          <li>
            <a href="javascript:void(0)" class="nav-item-iconic">
              <span title="Notifications" class="fa fa-bell"></span>
              <span class="badge">
                <span> </span>
              </span>
            </a>
          </li>
        </ul>
      </div> -->
    </nav>
    <div class="container-flex container-fluid ">
      <router-view/>
    </div>
  </div>
</template>




<script>
export default {
  name: 'app'
}
</script>

<style>
</style>
