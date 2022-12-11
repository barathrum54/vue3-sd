import { createStore } from 'vuex';
import themeLayout from './modules/themeLayout/actionCreator';
import gallery from './modules/gallery';
import users from './modules/users';
import chartContent from './modules/chartContent/actionCreator';
import email from './modules/email/actionCreator';
import headerSearchData from './modules/headerSearch/actionCreator';
import chat from './modules/chat/actionCreator';
import ecommerce from './modules/ecommerce/product/actionCreator';
import orders from './modules/ecommerce/orders/actionCreator';
import cart from './modules/ecommerce/cart/actionCreator';
import profile from './modules/profile/actionCreator';
import project from './modules/project/actionCreator';
import calendar from './modules/calendar/actionCreator';
import team from './modules/team/actionCreator';
import contact from './modules/contact/actionCreator';
import note from './modules/note/actionCreator';
import todo from './modules/todo/actionCreator';
import task from './modules/task/actionCreator';
import crud from './modules/crud/axios/actionCreator';
import auth from './modules/authentication/axios/actionCreator';
import KanbanBoard from './modules/kanban/actionCreator';
import user from './modules/user';
import authentication from './modules/authentication';
import shop from "./modules/shops";

export default createStore({
  modules: {
    themeLayout,
    gallery,
    users,
    chartContent,
    email,
    headerSearchData,
    chat,
    ecommerce,
    orders,
    cart,
    profile,
    project,
    calendar,
    team,
    contact,
    note,
    todo,
    task,
    crud,
    auth,
    KanbanBoard,
    user,

    // ITEMSATIS MODULES
    authentication,
    shop
  },
});
