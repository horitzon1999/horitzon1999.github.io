

var eventBus = new Vue()

Vue.component('product', {
    props: {
      premium: {
        type: Boolean,
        required: true
      }
    },
    template: `
     <div class="product">
          
        <div class="product-image">
          <img :src="image" />
        </div>
  
        <div class="product-info">
            <h1>{{ title }}</h1>
            
  			<detailAndShipping-tabs :estudis="estudis" :details="details"></detailAndShipping-tabs>
        
            <p>Fotos</p>
            <div class="color-box"
                 v-for="(variant, index) in variants"
                 :key="variant.variantId"
                 :style="{ backgroundColor: variant.variantColor }"
                 @mouseover="updateProduct(index)"
                 >
                 <p>{{ variant.variantTipo }}</p>
            </div> 
         </div> 

         <product-tabs :experiencias="experiencias" :reviews="reviews"></product-tabs>
      
      </div>
     `,
    data() {
      return {
          product: 'Albert Marti',
          brand: 'Chércoles i Farreras, ',
          selectedVariant: 0,
          details: ['CFGM sistemes microinformàtics i xarxes.  Escola Salesians de Sarria (2016-2018)','CFGS desenvolupament de aplicacions multiplataforma. Centre d´Estudis Politécnics  (2018-2020)','CFGS desenvolupament de aplicacions web. Centre d´Estudis Politécnics (2020-2021)'],
          variants: [
            {
              variantId: 2234,
              variantTipo:'Feliz',
              variantColor: 'grey',
              variantImage: 'https://live.mrf.io/statics/i/ps/www.movilzona.es/app/uploads/2019/05/Foto-de-Perfil-en-WhatsApp-696x364.jpg?width=1200&enable=upscale',
              variantQuantity: 10     
            },
            {
              variantId: 2235,
              variantTipo:'meh',
              variantColor: 'grey',
              variantImage: 'data:image/jpeg;base64,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',
              variantQuantity: 0     
            }
          ],
          reviews: [],
          experiencias: ['Becario informatico MECALUX S.A. +1050h (2017-2018)','Desarrollador Junior en ClickAndCargo (2020-Actualidad)'],
          estudis:['Correu: albert.chercoles.sds@gmail.com','Telefon: 123456789','Linkedin: linkedin.com']
      }
    },
      methods: {
        
        updateProduct(index) {  
            this.selectedVariant = index
        }
      },
      computed: {
          title() {
              return this.brand + ' ' + this.product  
          },
          image(){
              return this.variants[this.selectedVariant].variantImage
          },
          inStock(){
              return this.variants[this.selectedVariant].variantQuantity
          }
      },
      mounted() {
        eventBus.$on('review-submitted', productReview => {
          this.reviews.push(productReview)
        })
      }
  })


  Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">

    <p>
      <label for="name">Nombre</label>
      <input class="name" v-model="name">
    </p>
    

    <p>
    <label for="mail">Correo:</label>
    <input class="mail" v-model="mail">
    </p>

    <p>
      <label for="description">Descripcion:</label>      
      <textarea class="description" v-model="description"></textarea>
    </p>
    
    
      
    <p>
      <input type="submit" value="Submit">  
    </p>    
  
   </form>
    `,
    data() {
      return {
        name: null,
        description: null,
        mail: null,
        errors: []
      }
    },
    methods: {
      onSubmit() {
        this.errors = []
        if (this.name && this.description && this.mail) {
          let productReview = {
            name: this.name,
            description: this.description,
            mail: this.mail
          }
          eventBus.$emit('review-submitted', productReview)
          this.name = null
          this.description = null
          this.mail = null
        }
        else {
          if(!this.name) this.errors.push("Nombre necesaria.")
          if(!this.description) this.errors.push("Descripción necesaria.")
          if(!this.mail) this.errors.push("Correo necesaria.")
        }
      }
    }
  })

  Vue.component('product-tabs', {
    props: {
      reviews: {
        type: Array,
        required: false
      },
      experiencias: {
        type: Array,
        required: false
      }
    },
    template: `
      <div>
      
        <div>
          <span class="tabs" 
                :class="{ activeTab: selectedTab === tab }"
                v-for="(tab, index) in tabs"
                :key="index"
                @click="selectedTab = tab"
          >{{ tab }}</span>
        </div>

        <div v-show="selectedTab === 'Experiencia'">
            <p v-if="!experiencias.length">No hay experiencia :c .</p>
            <ul v-else>
                <li v-for="experiencia in experiencias">
                  <p>{{ experiencia }}</p>
                </li>
            </ul>
        </div>

        <div v-show="selectedTab === 'Solicitar contratación'">
          <product-review></product-review>
        </div>
    
      </div>
    `,
    data() {
      return {
        tabs: ['Experiencia', 'Solicitar contratación'],
        selectedTab: 'Experiencia'
      }
    }
  })

  
  Vue.component('detailAndShipping-tabs', {
    props: {
      details: {
        type: Array,
        required: false
      },
      estudis: {
        type: Array,
        required: false
      }
    },
    template: `
      <div>
      
        <div>
          <span class="tabs" 
                :class="{ activeTab: selectedTab === tab }"
                v-for="(tab, index) in tabs"
                :key="index"
                @click="selectedTab = tab"
          >{{ tab }}</span>
        </div>

        <div v-show="selectedTab === 'Informació'">
            <ul>
              <li v-for="estudi in estudis">{{ estudi }}</li>
            </ul>
        </div>

        <div v-show="selectedTab === 'Estudis'">
          <ul>
              <li v-for="detail in details">{{ detail }}</li>
            </ul>
        </div>
    
      </div>
    `,
    data() {
      return {
        tabs: ['Informació', 'Estudis'],
        selectedTab: 'Estudis'
      }
    }
  })
  
  
  var app = new Vue({
      el: '#app',
      data: {
        premium: true,
      },
      methods: {
      }
  })