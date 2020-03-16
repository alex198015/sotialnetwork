export type PostType = {
    id: number,
    message: string, 
    likesCount: number
}

export type ContactsType = {
    facebook: string,
    github: string,
    instagram: string,
    mainLink: null,
    twitter: string,
    vk: string,
    website: null,
    youtube: string
}

export type PhotosType = {
    small: string | null,
    large: string | null
}

export type ProfileType = {
    userId: number,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    contacts: ContactsType,
    photos: PhotosType
}

export type UserType = {
    id: number,
    name: string,
    status: string,
    photos: PhotosType
}