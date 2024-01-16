export namespace LAUFEN {
    export interface User{
        id: number
        mail: string
        name: string
        password: string
        is_admin: boolean
        img: string
    }
    export interface Itinerary{
        id: number
        age: number
        complexity: number
        title: string
        content: string
        creation_date: Date
        lat: number
        lng: number
        active: boolean
        gpx: string
        img: string
        doc: string
        label: boolean
        play: boolean
        departure: string
        distance: number
    }
    export interface Category{
        id: number
        name: string
    }
    export interface Article{
        id: number
        title: string
        abstract: string
        paragraph_one: string
        paragraph_two: string
        paragraph_three: string
        creation_date: Date
        active: boolean
        img: string
        img2: string
        img3: string
        categorie: string
    }
    export interface Pic{
        id: number
        name: string
        url: string
        city: string
        category: string
        lat: number
        lng: number
        street: string
        cp: number
    }
    export interface Favoris{
        id: number
        user_id: number
        itinerary_id: number
        favorite: boolean
    }
    export interface Product{
        id: number 
        user_id: number
        title: string
        content: string
        img: string 
        gender: string
        cut: string
        category: string
        department: string
        city: string
        price: number 
        confirm: boolean
    }
    export interface message{
        id: number
        user_recipient : number
        user_sender: number
        content: string
        actif: boolean
        product: number
        title: string
        description: string
        name_recipient: string
        // name_sender: string
        depends_of: number
    }
    export interface pil {
        id: number
        name: string
        url: string
        city: string
        category: string
        lat: number
        lng: number
        street: string
        cp: number
        id_i: number
        content: string
    }
}