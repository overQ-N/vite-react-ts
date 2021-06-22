import React from 'react'
import {MobXProviderContext} from 'mobx-react'
import { StoreType } from '@/stores'

interface ContextType{
  stores:StoreType
}
function useStores(): StoreType
function useStores<T extends keyof StoreType>(storeName:T):StoreType[T]
function useStores<T extends keyof StoreType>(storeName?:T) {
  const rootStore = React.useContext(MobXProviderContext)
  const { stores } = rootStore as ContextType
  return storeName?stores[storeName]:stores
}
export {
  useStores
}