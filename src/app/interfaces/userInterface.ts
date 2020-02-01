export interface ModelUserData {
  pk: string;
  fistName: string;
  lastName: string;
  gender: string;
  birthday_date: string;
  residence_country: string;
  headline: string;
  profession: string;
  education: string;
  area_choices: string;
  area: string;
  current_company: string;
  current_position: string;
  phone: string;
  mobile: string;
  image_perfil: string;
  image_perfil_base64: string;
}

export interface ModelUserLogIn {
  username: string;
  password: string;
}

export interface Profile {
  userData: ModelUserData[];
  events: Events[];
  skills: Skills[];
  interests: Interests[];
  accomplishments: Accomplishments[];
  experiences: Experiences[];
  contacts_profile_count: string;
  notifications: Notifications[];
  message_notifications: MessageNotifications[];
}

export interface MessageNotifications {
  unread_count: string;
  items: string;
}

export interface Notifications {
  unread_count: string;
  items: string;
}

export interface Experiences {
  pk: string;
  id: string;
  title: string;
  company: string;
  location: string;
  init_date: string;
  end_date: string;
  currently_working: string;
  headline_experience: string;
  description_experience: string;
}

export interface Accomplishments {
  pk: string;
  id: string;
  accomplishment_description: string;
}

export interface Interests {
  pk: string;
  id: string;
  interest_description: string;
}

export interface Events {
  id: string;
  event: string;
  address: string;
  author: string;
  event_end_date: string;
  event_init_date: string;
  event_site: string;
  location: string;
  firstName: string;
  lastName: string;
  image_perfil: string;
}

export interface Skills {
  id: string;
  skill_description: string;
  pk: string;
}
