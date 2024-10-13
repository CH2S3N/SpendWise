import { Tabs } from "expo-router"

export default function _layout() {
  return (
   <Tabs>
    <Tabs.Screen name="goal"/>
    <Tabs.Screen name="home"/>
    <Tabs.Screen name="profile"/>
   </Tabs>
  )
}