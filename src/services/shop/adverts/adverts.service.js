import { useHttps } from "@/config/http/http";
import { useAuthStore } from "@/store/auth/auth.store.js";

const authStoreMain = useAuthStore();
const _TOKEN = authStoreMain.getToken;
const https = useHttps();
const getPosts = async (state, order, page, limit) => {
  console.log(limit);
  let stateStringValue = "";
  let orderStringValue = "";
  if (typeof state == "number" && typeof order == "number") {
    const response = await https.post("merchant/v1/getMyPosts", {
      token: _TOKEN,
      State: state,
      Order: order,
      Page: page,
      Limit: limit,
    });
    console.log(response.data);
    if (response.data) return response.data;
    else return [];
  } else {
    if (state == "all") {
      stateStringValue = "";
    } else if (state == "active") {
      stateStringValue = 1;
    } else if (state == "inactive") {
      stateStringValue = 3;
    }
    if (order == "ai") {
      orderStringValue = 0;
    } else if (order == "ending") {
      orderStringValue = 1;
    } else if (order == "category") {
      orderStringValue = 2;
    } else if (order == "price") {
      orderStringValue = 3;
    }
    const response = await https.post("merchant/v1/getMyPosts", {
      token: _TOKEN,
      State: stateStringValue,
      Order: orderStringValue,
      Page: page,
      Limit: limit,
    });
    if (response.data) return response.data;
    else return [];
  }
};
const boostMyPost = async (postID,{Vitrin,SocialVitrin,MarketBoost,OneCikarilan}) => {
  const response = await https.get("boostMyPost", {
    token: _TOKEN,
    postID,
    OneCikarilan,
    Vitrin,
    SocialVitrin,
    MarketBoost
  });
  return response.data;
};
const searchPosts = async (title) => {
  const response = await https.post("merchant/v1/getMyPosts", {
    token: _TOKEN,
    Title: title,
  });
  console.log(response.data);
  return response.data;
};
const getDopingPrices = async () => {
  const response = await https.get("constantVariables", {
    token: _TOKEN,
  });
  return response.data;
};
const extendPosts = async (postID, extendHour) => {
  const response = await https.post("merchant/v1/extendMyPost", {
    token: _TOKEN,
    postID: postID,
    extendHour: extendHour,
  });
  return response.data;
};
const rePublishPost = async (Id) => {
  const response = await https.post("rePublishPost", {
    token: _TOKEN,
    Id: Id,
  });
  return response.data;
};
const moveUpPosts = async (postID) => {
  const response = await https.post("merchant/v1/moveUpMyPost", {
    token: _TOKEN,
    postID: postID,
  });
  return response.data;
};
const unPublishPosts = async (Id) => {
  const response = await https.post("unPublishPost", {
    token: _TOKEN,
    Id: Id,
  });
  console.log(Id);
  console.log(response.data);
  return response.data;
};
const getStocks = async (Id) => {
  const response = await https.post("merchant/v1/getMyPostStocks", {
    token: _TOKEN,
    postID: Id,
  });
  console.log(Id);
  console.log(response.data);
  return response.data; 
};
const removeStocks=async (postID,StockId) => {
  const response = await https.post("merchant/v1/deleteMyPostStock", {
    token: _TOKEN,
    postID,
    StockId
  });
  return response.data;
};
const getMySoldOrders=async (Id) => {
  const response = await https.post("merchant/v1/getMySoldOrders",{
    token: _TOKEN,
    PostId:Id
  })
  console.log(response.data);
  return response.data

}
const getPostAnalytics=async (Id) => {
  const response = await https.post("getPostAnalytics",{
    token: _TOKEN,
    postID:Id
  })
  console.log(response.data);
  return response.data
}
export {
  getPosts,
  getDopingPrices,
  searchPosts,
  extendPosts,
  rePublishPost,
  moveUpPosts,
  unPublishPosts,
  getStocks,
  removeStocks,
  getMySoldOrders,
  getPostAnalytics,
  boostMyPost
};
