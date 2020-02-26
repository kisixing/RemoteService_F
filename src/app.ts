/*
 * @Author: ZHONG JUN
 * @Date: 2019-09-20 22:11:57
 * @Description:
 *              redux-persist，处理数据持久化
 *              dva-logger打印日志，记录每一步操作的信息，实现前端 log 日志打印功能。
 */

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
  key: 'redux-storage',
  storage,
  blacklist: ['loading', 'router'],
  stateReconciler: autoMergeLevel2 // 查看 'Merge Process' 部分的具体情况
};

const persistEnhancer = () => (createStore: any) => (reducer: any, initialState: any, enhancer: any) => {
  const store = createStore(persistReducer(persistConfig, reducer), initialState, enhancer);
  const persist = persistStore(store, null);
  return { ...store, persist };
};

export const dva = {
  config: {
    onError(err: { preventDefault: () => void; message: any; }) {
      err.preventDefault();
      console.error(err.message);
    },
    extraEnhancers: [persistEnhancer()],
    onReducer: (reducer: any) => persistReducer(persistConfig, reducer)
  },
  plugins: [
    process.env.APP_TYPE === 'build' ? null : require('dva-logger')()
  ],
};
