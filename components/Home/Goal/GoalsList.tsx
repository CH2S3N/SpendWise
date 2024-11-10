import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import GoalListItem from './GoalListItem';
import { Goal } from "@/types";


export default function GoalsList({
    goals,
    deleteGoal,
}: {
    goals: Goal[];
    deleteGoal: (id: number) => Promise<void>;
}) {
  return (
    <ScrollView>
        {goals.map((goal, deleteGoal) => (
        <View key={goal.id}>
          <GoalListItem goal={goal}/>
        </View>
      ))}
    </ScrollView>
  )
}