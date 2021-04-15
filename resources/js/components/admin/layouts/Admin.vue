<template>
  <div class="hold-transition sidebar-mini">
<div class="wrapper">
  <!-- Navbar -->
  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#"><i class="pe-7s-menu" style="font-size: 30px;line-height: 21px;"></i></a>
      </li>
    </ul>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <a href="#" class="logout_btn" @click.prevent="logoutProfile"> <i class="pe-7s-next-2"></i> Выйти</a>
      </li>
    </ul>
  </nav>
  <!-- /.navbar -->

  <!-- Main Sidebar Container -->
  <aside class="main-sidebar">
    <!-- Brand Logo -->
    <router-link class="brand-link" to="/crm">
      <span class="brand-text font-weight-light">
        e-Waybill
      </span>
    </router-link>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column sidebar-menu treeview" data-widget="treeview" role="menu" data-accordion="false" >
          <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
          <li class="nav-item" v-if="$can('index', 'DashboardController')">
            <router-link to="/crm/dashboard" class="nav-link">
              <span class="peIcon pe-7s-rocket" style="font-size: 20px;"></span>
              <p>
                Админ панель
              </p>
            </router-link>
          </li>
          <li class="nav-item" v-if="$can('profile', 'UserController')">
            <router-link class="nav-link" to="/crm/profile">
              <i class="peIcon pe-7s-user"></i>
              <p>
                Мои данные
              </p>
            </router-link>
          </li>
          <li class="nav-item" v-if="$can('carrier', 'UserController')">
            <router-link class="nav-link" to="/crm/client">
              <i class="peIcon pe-7s-users"></i>
              <p>
                Перевозчики
              </p>
            </router-link>
          </li>
          <li class="nav-item" v-if="$can('index', 'PositionController')">
            <router-link class="nav-link" to="/crm/position">
              <i class="peIcon pe-7s-graph1"></i>
              <p>
                Должность
              </p>
            </router-link>
          </li>
          <li class="nav-item" v-if="$can('index', 'EmployeeController')">
            <router-link class="nav-link" to="/crm/employee">
              <i class="peIcon fas fa-users"></i>
              <p>
                Сотрудники
              </p>
            </router-link>
          </li>
          <li class="nav-item has-treevie">
            <a href="#" class="nav-link">
              <i class="peIcon fas fa-cogs" style="font-size: 20px;"></i>
              <p>
                Основные настройки
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treevie">
              <li class="nav-item" v-if="$can('index', 'RegionController')">
                <router-link class="nav-link" to="/crm/region">
                  <i class="peIcon fas fa-globe"></i>
                  <p>
                    Области
                  </p>
                </router-link>
              </li>
              <li class="nav-item" v-if="$can('index', 'AreaController')">
                <router-link class="nav-link" to="/crm/area">
                  <i class="peIcon fas fa-globe-europe"></i>
                  <p>
                    Регион / Город
                  </p>
                </router-link>
              </li>
            </ul>
          </li>
          <li class="nav-item has-treevie" v-if="$can('index', 'RoleController')">
            <a href="#" class="nav-link">
              <span class="peIcon pe-7s-settings" style="font-size: 20px;"></span>
              <p>
                Setting users
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treevie">
              <li class="nav-item" v-if="$can('index', 'RoleController')">
                <router-link class="nav-link" to="/crm/role">
                  <p>
                    Role
                  </p>
                </router-link>
              </li>
              <li class="nav-item" v-if="$can('index', 'ContsController')">
                <router-link class="nav-link" to="/crm/conts">
                  <p>
                    Controller
                  </p>
                </router-link>
              </li>
              <li class="nav-item" v-if="$can('index', 'ActionController')">
                <router-link class="nav-link" to="/crm/action">
                  <p>
                    Actions
                  </p>
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Main content -->
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-12">
            <router-view></router-view>
            <vue-progress-bar></vue-progress-bar>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /.control-sidebar -->

  <!-- Main Footer -->
  <footer class="main-footer">
    <strong>Copyright &copy; {{ new Date().getFullYear() }} <a href="https://mintrans.uz" target="_blank">O'ZBEKISTON RESPUBLIKASI TRANSPORT VAZIRLIGI </a>.</strong>
    All rights reserved.
  </footer>
</div>
</div>
</template>

<script>

  import { mapActions, mapGetters } from "vuex";
  import {TokenService} from './../../../services/storage.service'
export default {
  components: {},
  data(){
    return {

    }
  },
  computed: {
    ...mapGetters(['getUser']),
  },
  async mounted(){
    await this.profileUser()
    $('.has-treevie a').on('click', function(e){
        e.preventDefault();
        $(this).parent('.has-treevie').toggleClass('menu-opens')
    })
  },
  methods: {
    ...mapActions(['logout','profileUser']),
    logoutProfile(){
      this.logout();
    },

  }
};
</script>

<style scoped>
    .brand-text img{
        width: 52px;
    }
    .nav-sidebar .nav-treevie{
        display: block;
        padding: 0em 0 0 2rem;
        position: relative;
        max-height: 0;
        overflow: hidden;
        transition: .5s !important;
    }

    .nav-sidebar .nav-treevie::before {
        content: "";
        max-height: 0;
        height: 100%;
        opacity: 1;
        width: 3px;
        background: #52dcbc;
        position: absolute;
        left: 32px;
        top: 0;
        border-radius: 15px;
        transition: .5s !important;
    }
    .nav-sidebar .has-treevie.menu-opens .nav-treevie::before,
    .has-treevie.menu-opens > .nav-treevie{
        max-height: 700px;
    }
    .nav-sidebar .menu-opens>.nav-link i.right{
        transform: rotate(-90deg);
    }
</style>
