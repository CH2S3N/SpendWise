import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import GoalListItem from './GoalListItem';
import { Goal } from "@/types";


export default function GoalsList({
    goals,
}: {
    goals: Goal[];
}) {
  return (
    <ScrollView>
        {goals.map((goal) => (
        <View key={goal.id}>
          <GoalListItem goal={goal}/>
        </View>
      ))}
    </ScrollView>
  )
}