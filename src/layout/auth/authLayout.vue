<template>
  <a-row>
    <a-col :xxl="8" :xl="9" :lg="12" :md="8" :xs="24">
      <Aside>
        <div class="auth-side-content">
          <img :src="require('@/static/img/auth/topShape.png')" alt="" class="topShape" />
          <img :src="require('@/static/img/auth/bottomShape.png')" alt="" class="bottomShape" />
          <Content>
            <br />
            <sdHeading as="h2" style="margin-bottom:-5px;">İtemSatış</sdHeading>
            <sdHeading as="h1">Mağaza Paneli</sdHeading>
	          <p>İtemSatış B2B çözümleri için,<br>İşlemlerinizi bağımsız olarak çok daha hızlı tamamlayın.</p>
	          <p>Gelişmiş teknoloji ile donatılmış Mağaza panelini keşfedin!</p>
	          <p>Kurumsal sorun ve çözümleriniz için,<br><b>kurumsal@itemsatis.com.tr</b> adresinden bizlere ulaşabilirsiniz.</p>
          </Content>
        </div>
      </Aside>
    </a-col>

    <a-col :xxl="16" :xl="15" :lg="12" :md="16" :xs="24">
      <router-view></router-view>
    </a-col>
  </a-row>
</template>
<script>
import { Aside, Content } from '../style';

const AuthLayout = {
  name: 'AuthLayout',
  components: { Aside, Content },
};

export default AuthLayout;
</script>

<style scoped>
img{
  width: 100%;
}

</style>