export {};
declare global {
  // Global Response
  interface IBackendRes<T> {
    success: boolean;
    statusCode: number;
    message: string | string[];
    data: T | null;
  }

  //Module User

  interface IUser {
    user_id: string;
    full_name: string;
    email: string;
    phone: string | null;
    address: string | null;
    created_at: Date;
    updated_at: Date;
    deletedAt: Date | null;
  }

  interface IUserWithPage {
    users: IUser[];
    total: number;
  }

  //Module Auth

  interface ILogin {
    user: IUser;
    access_token: string;
    refresh_token: string;
    expired_in: string;
    role: string;
  }

  interface IRegister {
    user: IUser;
    access_token: string;
    refresh_token: string;
    expired_in: string;
  }

  interface IFetch {
    user: IUser;
  }

  interface IVerify {
    reset_token: string;
  }

  //Module Category

  interface ICategory {
    category_id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
  }

  interface ICategoryWithPage {
    categories: ICategory[];
    total: number;
  }

  //Module Variant

  interface IVariant {
    variant_id?: string;
    product?: {
      product_id: string;
    };
    layout: string;
    color: string;
    image: string | null;
    price: string | number;
    stock_quantity: number;
    created_at?: Date;
    updated_at?: Date;
  }

  //Module Product

  interface IProduct {
    product_id: string;
    name: string;
    description: string;
    brand: string;
    category: {
      category_id: string;
      name?: string;
      created_at?: Date;
      updated_at: Date;
    };
    variants?: IVariant[];
    created_at: Date;
    updated_at: Date;
  }

  interface IProductWithPage {
    product: IProduct[];
    total: number;
  }

  //Module CartItem

  interface ICartItem {
    cart_item_id: string;
    variant: IVariant;
    cart: {
      cart_id: string;
    };
    quantity: number;
    created_at: Date;
    updated_at: Date;
  }

  //Module Cart

  interface ICart {
    cart_id: string;
    user: IUser;
    items: ICartItem[];
    created_at: Date;
    updated_at: Date;
  }

  //Module OrderItem

  interface IOrderItem {
    order_item_id: string;
    order: {
      order_id: string;
    };
    variant: {
      variant_id: string;
    };
    quantity: number;
    price: string | number;
  }

  //Module Payment (Server processing)
  interface IPayment {
    payment_id: string;
    user: IUser;
    order: {
      order_id: string;
      order_status: string;
      total_price: string;
      created_at: Date;
      updated_at: Date;
    };
    payment_method: string;
    amount: string | number;
    status: string;
    created_at: Date;
    updated_at: Date;
  }
  //Module Shipping (Server processing)

  interface IShipping {
    shipping_id: string;
    order: {
      order_id: string;
    };
    address: string;
    city: string;
    country: string;
    shipping_method: string;
    shipping_status: preparing;
    shipped_at: string | null;
    delivered_at: Date | null;
  }

  //Module Order

  interface IOrder {
    order_id: string;
    user?: IUser;
    order_status: string;
    total_price: number | string;
    items?: IOrderItem[];
    payment?: IPayment;
    shipping?: IShipping;
    created_at: Date;
    updated_at: Date;
  }

  interface IOrderWithPage {
    orders: IOrder[];
    total: number;
  }

  interface IPaymentWithPage {
    payments: IPayment[];
    total: number;
  }

  interface IMomoCreateResponse {
    payUrl: string;
    deeplink: string;
    qrCodeUrl: string;
    orderId: string;
    requestId: string;
  }

  interface IVnpayCreateResponse {
    payUrl: string;
  }

  interface IUpload {
    url: string;
    public_id: string;
    resource_type: string;
  }
}
