class PublicPage {

	HOME = "/";
	NOTICE = "/notice";
	BASKET = "/basket";
	REGISTRATION_SUBSCRIPTION = "/registration-subscriptions";
	MYORDERS = "/my-orders";
	FOLLOW = "/follow";

	/// PROFILE ///
	
	PROFILE = "/profile";
	ANALYTICS = "/profile/analytics";
	EDITPROFILE = "/profile/edit-profile";
	MYCHILDREN = "/profile/my-children";



	/// HISTORY ///

	HISTORY_DELIVERY = "/history/delivery-history";
	HISTORY_PAYMENT = "/history/payment-history";



	/// AUTH ///

	AUTH = "/auth"
	AUTH_PRE_REGISTRATION = "/auth/pre-registration"
	AUTH_REGISTRATION = "/auth/registration"
	AUTH_LOGIN = "/auth/login"
	AUTH_FORGOT_PASSWORD = "/auth/forgot-password"
	AUTH_RESET_PASSWORD = "/auth/reset-password"
	AUTH_MINI_SURVEY = "/auth/mini-survey"

	/// PAY ///

	PAYMENT_SUCCESS = "/payment/success";
	PAYMENT_CANCEL = "/payment/cancel";
	PAYMENT = "/payment";


}

export const PAGE = new PublicPage();
