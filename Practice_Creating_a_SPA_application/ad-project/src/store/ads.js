import * as firebase from 'firebase'

class Ad {
    constructor(title, description, ownerId, imageSrc = '', promo = false, id = null) {
        this.title = title
        this.description = description
        this.ownerId = ownerId
        this.imageSrc = imageSrc
        this.promo = promo
        this.id = id
    }
}

export default {
    state: {
        ads: [
            {
                title: 'First Ad',
                description: 'Hello I am a desc for the first image',
                promo: true,
                imageSrc: 'https://149366088.v2.pressablecdn.com/' +
                    'wp-content/uploads/2019/03/fedora-30-wallpaper.jpg',
                id: '123'
            },
            {
                title: 'Second Ad',
                description: 'Description for the second image',
                promo: false,
                // imageSrc: 'https://i.ibb.co/VjrK66B/ava.png',
                imageSrc: 'https://data.whicdn.com/images/304947669/original.jpg',
                id: '1234'
            },
            {
                title: 'Third Ad',
                description: 'Babbles',
                promo: true,
                imageSrc: 'https://livewallpaperhd.com/wp-content/' +
                    'uploads/2017/05/Blue-Wallpaper-For-Computer.jpg',
                id: '12345'
            }
        ]
    },

    actions: {
        async createAd ({commit, getters}, adObjFromForm){
            // eslint-disable-next-line no-console
            console.log('CreateAd Action is called')

            // eslint-disable-next-line no-console
            console.log(adObjFromForm)

            //adObjFromForm.id = 'Math.random()'

            commit('clearError')
            commit('setLoading', true)
            //commit('createAd', adObjFromForm)

            // eslint-disable-next-line no-console
            console.log("= adObjFromForm: ", adObjFromForm)

            try{
                const newAd = new Ad(
                    adObjFromForm.title,
                    adObjFromForm.description,
                    getters.user.id,
                    adObjFromForm.imageSrc,
                    adObjFromForm.promo)
                const fireBaseAdValue = await firebase.database().ref('ads').push(newAd)

                commit('setLoading', false)
                commit('createAd', {
                    ...newAd,
                    id: fireBaseAdValue.key
                })

                // eslint-disable-next-line no-console
                console.log("= fireBaseValue (return object of push to DB operation): ", fireBaseAdValue)
                // eslint-disable-next-line no-console
                //console.log("= fireBaseValue (return object of push to DB operation): ", getters.user.id,)
            }
            catch(error) {
                commit('setError'. error.message)
                commit('setLoading', false)
                throw error
            }
        }
    },

    mutations: {
        createAd(state, adObjFromFormAndFireBase){
            // eslint-disable-next-line no-console
            console.log('CreateAd mutation is called')
            // eslint-disable-next-line no-console
            console.log(state)
            state.ads.push(adObjFromFormAndFireBase)
        }
    },

    getters: {
        ads (state) {
            return state.ads
        },
        promoAds (state) {
            return state.ads.filter(ad => {
                return ad.promo === true
            })
        },
        myAds (state){
            return state.ads
        },
        adById (state){
            return adId => {
                return state.ads.find(ad => ad.id === adId)
            }
        }
    }

}