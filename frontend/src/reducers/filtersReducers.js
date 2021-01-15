import {GET_FILTERED_PRODUCTS, GET_FILTERS, UPDATE_FILTERS} from '../constants/filtersConstants'
import { PRODUCTS_LIST_FAIL, PRODUCTS_LIST_REQUEST, PRODUCTS_LIST_SUCCESS } from '../constants/productsConstants'


export const productsFilteredReducer = (state = 
  { 
    loading : true,
    allProducts : [], 
    filteredProducts : [],
    filters : {
      minPrice : 0,
      maxPrice : '',
      category : 'tous les produits',
      sort : 'newer'
    }
  },
    action) => {
  switch (action.type){
    case PRODUCTS_LIST_REQUEST:
      return {...state, loading:true }

    case PRODUCTS_LIST_SUCCESS:
      return {...state, loading:false, allProducts : action.payload }
    case GET_FILTERS :
      return {...state, loading:false, filters : state.filters}
    case GET_FILTERED_PRODUCTS :
      const {allProducts} = state
      const {category, minPrice, maxPrice, sort} = state.filters

      let tempProducts = [...allProducts]
        if(minPrice) {
          tempProducts = tempProducts.filter(product => product.prix> minPrice)
        }
        if(maxPrice) {
          tempProducts = tempProducts.filter(product => product.prix< maxPrice)
        }
        if(category!=='tous les produits'){
          tempProducts = tempProducts.filter(product => product.catégorie === category)
        }
        if(sort==='newer'){
          tempProducts = tempProducts.reverse()
        }
        if(sort==='older'){
          tempProducts = [...tempProducts]
        }
        if(sort==='higher'){
          tempProducts = tempProducts.sort((a, b)=> a.prix - b.prix)
        }
        if(sort==='lower'){
          tempProducts = tempProducts.sort((a, b)=> b.prix - a.prix)
        }
      return {...state, loading : false, filteredProducts : tempProducts}

    case UPDATE_FILTERS :
      return {...state, filters : action.payload}
    case PRODUCTS_LIST_FAIL:
      return {...state, loading:false, error : action.payload}
    default:
      return state

  }
}
