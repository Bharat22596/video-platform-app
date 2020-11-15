export class APIReference{

    public static BASE_URL = "http://localhost:8080";

    public static CREATE_USER = APIReference.BASE_URL+ "/user/create";
	public static GET_USER = APIReference.BASE_URL+ "/user";
	public static UPDATE_USER = APIReference.BASE_URL+ "/user/{userId}/update";
	
	public static UPLOAD_VIDEO = APIReference.BASE_URL+ "/video/upload";
	public static GET_VIDEOS = APIReference.BASE_URL+ "/videos";
	public static GET_VIDEO = APIReference.BASE_URL+ "/video";
	public static UPDATE_VIDEO = APIReference.BASE_URL+ "/video/update";

	public static AUTHENTICATE_USER = APIReference.BASE_URL+ "/user/auth";


    constructor(){

    }
}