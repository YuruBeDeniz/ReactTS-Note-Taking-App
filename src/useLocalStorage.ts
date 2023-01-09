import { useEffect, useState } from "react"

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key)
    if (jsonValue == null) {
      if (typeof initialValue === "function") {
        return (initialValue as () => T)()
      } else {
        return initialValue
      }
    } else {
      return JSON.parse(jsonValue)
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value, key])

  return [value, setValue] as [T, typeof setValue]
}

//initalValue is either a generic type T or a function because when you use
//useState you can either pass it a function or you can pass it an initial value
//either one is going to work  

//inside useState we use the function version of useState because we want to first
//check if this data is in local storage 

//with useLocalStorage hook, now we have a place to store our notes and tags!