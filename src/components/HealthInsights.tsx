import React, { useState, useEffect, useRef } from 'react';
import { Heart, Activity, Moon, Droplets, Brain, TrendingUp, Book, Shield, Baby, Flower, Star, Calendar, Clock, Target, AlertCircle, Coffee, Scale, Stethoscope, Thermometer, Leaf, Info, CheckCircle, AlertTriangle, ChevronDown, ChevronUp, Users, Pill, User, ArrowLeft, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { toast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from '@/contexts/LanguageContext';


const HealthInsights = ({ isSubscribered, checkSubDate, setActiveSection, freeDayTrial }) => {
  const [expandedDischarge, setExpandedDischarge] = useState<string | null>(null);
  const [expandedBlood, setExpandedBlood] = useState<string | null>(null);
  const [expandedPregnancy, setExpandedPregnancy] = useState<string | null>(null);
  const [expandedPCOS, setExpandedPCOS] = useState<string | null>(null);
  const [expandedEndometriosis, setExpandedEndometriosis] = useState<string | null>(null);
  const [expandedCrampTriggers, setExpandedCrampTriggers] = useState<string | null>(null);
  const [expandedLatePeriods, setExpandedLatePeriods] = useState<string | null>(null);
  const [expandedPeriodLength, setExpandedPeriodLength] = useState<string | null>(null);
  const [expandedContraception, setExpandedContraception] = useState<string | null>(null);
  const [expandedRemedies, setExpandedRemedies] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);

  const [openInsightVideoOne, setOpenInsightVideoOne] = useState(false);
  const [openInsightVideoTwo, setOpenInsightVideoTwo] = useState(false);


  const { getLocalizedText } = useLanguage();

  // State for collapsible sections
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const triggerRef = useRef(null);

  const triggerRefTwo = useRef(null);

  const handleOpenInsightVideoOne = () => {
    triggerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => setOpenInsightVideoOne(true), 300);
  };

  const handleOpenInsightVideoTwo = () => {
    triggerRefTwo.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => setOpenInsightVideoTwo(true), 300);
  };




  const dischargeTypes = [
    {
      id: 'white',
      title: getLocalizedText('white.discharge'),
      color: 'bg-gray-100 border-gray-300',
      textColor: 'text-gray-800',
      icon: '⚪',
      status: 'safe',
      brief: getLocalizedText('white.discharge.description'),
      detailed: (
        <>
          {getLocalizedText('white.discharge.guidance')}
          <br />
          <strong className='ms-10 '>Can also be a sign of pregnancy</strong>
        </>
      )
    },
    {
      id: 'yellow',
      title: getLocalizedText('yellow.discharge'),
      color: 'bg-yellow-100 border-yellow-300',
      textColor: 'text-yellow-800',
      icon: '🟡',
      status: 'caution',
      brief: getLocalizedText('yellow.discharge.description'),
      detailed: getLocalizedText('yellow.discharge.guidance')
    },
    {
      id: 'white-clumpy',
      title: getLocalizedText('white.clumpy'),
      color: 'bg-gray-200 border-gray-400',
      textColor: 'text-gray-800',
      icon: '🧀',
      status: 'attention',
      brief: getLocalizedText('white.clumpy.description'),
      detailed: (
        <>
          {getLocalizedText('white.clumpy.guidance')}
          <br />
          <strong className='ms-10 '>Can also be a sign of pregnancy</strong>
        </>
      )
    },
    {
      id: 'clear',
      title: getLocalizedText('clear.discharge'),
      color: 'bg-blue-50 border-blue-200',
      textColor: 'text-blue-800',
      icon: '💧',
      status: 'safe',
      brief: getLocalizedText('clear.discharge.description'),
      detailed: getLocalizedText('clear.discharge.guidance')
    },
    {
      id: 'brown',
      title: getLocalizedText('brown.discharge'),
      color: 'bg-amber-100 border-amber-300',
      textColor: 'text-amber-800',
      icon: '🟤',
      status: 'safe',
      brief: getLocalizedText('brown.discharge.description'),
      detailed: getLocalizedText('brown.discharge.guidance')
    },
    {
      id: 'pink',
      title: getLocalizedText('pink.discharge'),
      color: 'bg-pink-100 border-pink-300',
      textColor: 'text-pink-800',
      icon: '🌸',
      status: 'safe',
      brief: getLocalizedText('pink.discharge.description'),
      detailed: getLocalizedText('pink.discharge.guidance')
    },
    {
      id: 'green',
      title: getLocalizedText('green.discharge'),
      color: 'bg-green-100 border-green-400',
      textColor: 'text-green-800',
      icon: '🟢',
      status: 'urgent',
      brief: getLocalizedText('green.discharge.description'),
      detailed: getLocalizedText('green.discharge.guidance')
    },
    {
      id: 'gray',
      title: getLocalizedText('gray.discharge'),
      color: 'bg-slate-100 border-slate-400',
      textColor: 'text-slate-800',
      icon: '⚫',
      status: 'urgent',
      brief: getLocalizedText('gray.discharge.description'),
      detailed: getLocalizedText('gray.discharge.guidance')
    }
  ];


  const bloodTypes = [
    {
      id: 'bright-red',
      title: getLocalizedText('bright.red'),
      color: 'bg-red-100 border-red-300',
      textColor: 'text-red-800',
      icon: '🔴',
      status: 'safe',
      brief: getLocalizedText('bright.red.description'),
      detailed: getLocalizedText('bright.red.guidance')
    },
    {
      id: 'dark-red',
      title: getLocalizedText('dark.red'),
      color: 'bg-red-200 border-red-400',
      textColor: 'text-red-900',
      icon: '🟤',
      status: 'safe',
      brief: getLocalizedText('dark.red.description'),
      detailed: getLocalizedText('dark.red.guidance')
    },
    {
      id: 'brown',
      title: getLocalizedText('brown.blood'),
      color: 'bg-amber-100 border-amber-400',
      textColor: 'text-amber-800',
      icon: '🟫',
      status: 'safe',
      brief: getLocalizedText('brown.blood.description'),
      detailed: getLocalizedText('brown.blood.guidance')
    },
    {
      id: 'pink',
      title: getLocalizedText('pink.blood'),
      color: 'bg-pink-100 border-pink-300',
      textColor: 'text-pink-800',
      icon: '🌸',
      status: 'safe',
      brief: getLocalizedText('pink.blood.description'),
      detailed: getLocalizedText('pink.blood.guidance')
    },
    {
      id: 'black',
      title: getLocalizedText('black.blood'),
      color: 'bg-gray-200 border-gray-500',
      textColor: 'text-gray-800',
      icon: '⚫',
      status: 'attention',
      brief: getLocalizedText('black.blood.description'),
      detailed: getLocalizedText('black.blood.guidance')
    },
    {
      id: 'orange',
      title: getLocalizedText('orange.blood'),
      color: 'bg-orange-100 border-orange-300',
      textColor: 'text-orange-800',
      icon: '🟠',
      status: 'caution',
      brief: getLocalizedText('orange.blood.description'),
      detailed: getLocalizedText('orange.blood.guidance')
    },
    {
      id: 'gray',
      title: getLocalizedText('gray.blood'),
      color: 'bg-slate-200 border-slate-400',
      textColor: 'text-slate-800',
      icon: '🔘',
      status: 'urgent',
      brief: getLocalizedText('gray.blood.description'),
      detailed: getLocalizedText('gray.blood.guidance')
    }
  ];




  const pregnancySigns = [
    {
      id: 'missed-period',
      title: getLocalizedText('missed.period'),
      icon: '📅',
      brief: getLocalizedText('missed.period.description'),
      detailed: getLocalizedText('missed.period.guidance'),
      status: 'attention'
    },
    {
      id: 'implantation-bleeding',
      title: getLocalizedText('implantation.bleeding'),
      icon: '🩸',
      brief: getLocalizedText('implantation.bleeding.description'),
      detailed: getLocalizedText('implantation.bleeding.guidance'),
      status: 'safe'
    },
    {
      id: 'breast-changes',
      title: getLocalizedText('breast.tenderness'),
      icon: '🤱',
      brief: getLocalizedText('breast.tenderness.description'),
      detailed: getLocalizedText('breast.tenderness.guidance'),
      status: 'safe'
    },
    {
      id: 'nausea',
      title: getLocalizedText('morning.sickness'),
      icon: '🤢',
      brief: getLocalizedText('morning.sickness.description'),
      detailed: getLocalizedText('morning.sickness.guidance'),
      status: 'safe'
    },
    {
      id: 'fatigue',
      title: getLocalizedText('extreme.fatigue'),
      icon: '😴',
      brief: getLocalizedText('extreme.fatigue.description'),
      detailed: getLocalizedText('extreme.fatigue.guidance'),
      status: 'safe'
    },
    {
      id: 'frequent-urination',
      title: getLocalizedText('frequent.urination'),
      icon: '🚽',
      brief: getLocalizedText('frequent.urination.description'),
      detailed: getLocalizedText('frequent.urination.guidance'),
      status: 'safe'
    },
    {
      id: 'food-aversions',
      title: getLocalizedText('food.aversion'),
      icon: '🤮',
      brief: getLocalizedText('food.aversion.description'),
      detailed: getLocalizedText('food.aversion.guidance'),
      status: 'safe'
    },
    {
      id: 'mood-changes',
      title: getLocalizedText('mood.swings'),
      icon: '😢',
      brief: getLocalizedText('mood.swings.description'),
      detailed: getLocalizedText('mood.swings.guidance'),
      status: 'safe'
    },
    {
      id: 'cramping',
      title: getLocalizedText('mild.cramping'),
      icon: '🩹',
      brief: getLocalizedText('mild.cramping.description'),
      detailed: getLocalizedText('mild.cramping.guidance'),
      status: 'caution'
    },
    {
      id: 'basal-temperature',
      title: getLocalizedText('elevated.basal.temperature'),
      icon: '🌡️',
      brief: getLocalizedText('elevated.basal.temperature.description'),
      detailed: getLocalizedText('elevated.basal.temperature.guidance'),
      status: 'safe'
    }
  ];



  const pcosTopics = [
    {
      id: 'irregular-periods',
      title: getLocalizedText('irregular.periods'),
      icon: '📅',
      brief: getLocalizedText('irregular.periods.description'),
      detailed: getLocalizedText('irregular.periods.guidance'),
      status: 'attention'
    },
    {
      id: 'excess-androgens',
      title: getLocalizedText('excess.androgens'),
      icon: '🧔',
      brief: getLocalizedText('excess.androgens.description'),
      detailed: getLocalizedText('excess.androgens.guidance'),
      status: 'attention'
    },
    {
      id: 'insulin-resistance',
      title: getLocalizedText('insulin.resistance'),
      icon: '🍯',
      brief: getLocalizedText('insulin.resistance.description'),
      detailed: getLocalizedText('insulin.resistance.guidance'),
      status: 'caution'
    },
    {
      id: 'weight-management',
      title: getLocalizedText('weight.management'),
      icon: '⚖️',
      brief: getLocalizedText('weight.management.description'),
      detailed: getLocalizedText('weight.management.guidance'),
      status: 'attention'
    },
    {
      id: 'fertility-issues',
      title: getLocalizedText('fertility.challenges'),
      icon: '👶',
      brief: getLocalizedText('fertility.challenges.description'),
      detailed: getLocalizedText('fertility.challenges.guidance'),
      status: 'attention'
    },
    {
      id: 'skin-issues',
      title: getLocalizedText('skin.problems'),
      icon: '🔴',
      brief: getLocalizedText('skin.problems.description'),
      detailed: getLocalizedText('skin.problems.guidance'),
      status: 'caution'
    },
    {
      id: 'mood-disorders',
      title: getLocalizedText('mood.mental.health'),
      icon: '🧠',
      brief: getLocalizedText('mood.mental.health.description'),
      detailed: getLocalizedText('mood.mental.health.guidance'),
      status: 'attention'
    },
    {
      id: 'sleep-apnea',
      title: getLocalizedText('sleep.disorders'),
      icon: '😴',
      brief: getLocalizedText('sleep.disorders.description'),
      detailed: getLocalizedText('sleep.disorders.guidance'),
      status: 'caution'
    },
    {
      id: 'dietary-management',
      title: getLocalizedText('dietary.approaches'),
      icon: '🥗',
      brief: getLocalizedText('dietary.approaches.description'),
      detailed: getLocalizedText('dietary.approaches.guidance'),
      status: 'safe'
    },
    {
      id: 'exercise-benefits',
      title: getLocalizedText('exercise.movement'),
      icon: '🏃‍♀️',
      brief: getLocalizedText('exercise.movement.description'),
      detailed: getLocalizedText('exercise.movement.guidance'),
      status: 'safe'
    }
  ];


  const endometriosisTopics = [
    {
      id: 'pelvic-pain',
      title: getLocalizedText('pelvic.pain'),
      icon: '🩹',
      brief: getLocalizedText('pelvic.pain.description'),
      detailed: getLocalizedText('pelvic.pain.guidance'),
      status: 'attention'
    },
    {
      id: 'painful-periods',
      title: getLocalizedText('painful.menstruation'),
      icon: '😣',
      brief: getLocalizedText('painful.menstruation.description'),
      detailed: getLocalizedText('painful.menstruation.guidance'),
      status: 'attention'
    },
    {
      id: 'heavy-bleeding',
      title: getLocalizedText('heavy.menstrual.bleeding'),
      icon: '🩸',
      brief: getLocalizedText('heavy.menstrual.bleeding.description'),
      detailed: getLocalizedText('heavy.menstrual.bleeding.guidance'),
      status: 'caution'
    },
    {
      id: 'painful-intercourse',
      title: getLocalizedText('pain.during.intimacy'),
      icon: '💔',
      brief: getLocalizedText('pain.during.intimacy.description'),
      detailed: getLocalizedText('pain.during.intimacy.guidance'),
      status: 'attention'
    },
    {
      id: 'fertility-concerns',
      title: getLocalizedText('fertility.issues'),
      icon: '👶',
      brief: getLocalizedText('fertility.issues.description'),
      detailed: getLocalizedText('fertility.issues.guidance'),
      status: 'attention'
    },
    {
      id: 'digestive-symptoms',
      title: getLocalizedText('digestive.problems'),
      icon: '🤢',
      brief: getLocalizedText('digestive.problems.description'),
      detailed: getLocalizedText('digestive.problems.guidance'),
      status: 'caution'
    },
    {
      id: 'fatigue',
      title: getLocalizedText('chronic.fatigue'),
      icon: '😴',
      brief: getLocalizedText('chronic.fatigue.description'),
      detailed: getLocalizedText('chronic.fatigue.guidance'),
      status: 'attention'
    },
    {
      id: 'pain-management',
      title: getLocalizedText('pain.management'),
      icon: '💊',
      brief: getLocalizedText('pain.management.description'),
      detailed: getLocalizedText('pain.management.guidance'),
      status: 'safe'
    },
    {
      id: 'emotional-support',
      title: getLocalizedText('emotional.wellbeing'),
      icon: '💚',
      brief: getLocalizedText('emotional.wellbeing.description'),
      detailed: getLocalizedText('emotional.wellbeing.guidance'),
      status: 'safe'
    },
    {
      id: 'treatment-options',
      title: getLocalizedText('treatment.approaches'),
      icon: '🏥',
      brief: getLocalizedText('treatment.approaches.description'),
      detailed: getLocalizedText('treatment.approaches.guidance'),
      status: 'safe'
    }
  ];



  const crampTriggers = [
    {
      id: 'caffeine',
      title: getLocalizedText('caffeine.intake'),
      icon: '☕',
      brief: getLocalizedText('caffeine.intake.description'),
      detailed: getLocalizedText('caffeine.intake.guidance'),
      status: 'caution'
    },
    {
      id: 'processed-foods',
      title: getLocalizedText('processed.foods'),
      icon: '🍟',
      brief: getLocalizedText('processed.foods.description'),
      detailed: getLocalizedText('processed.foods.guidance'),
      status: 'caution'
    },
    {
      id: 'sugar',
      title: getLocalizedText('high.sugar.intake'),
      icon: '🍰',
      brief: getLocalizedText('high.sugar.intake.description'),
      detailed: getLocalizedText('high.sugar.intake.guidance'),
      status: 'caution'
    },
    {
      id: 'dehydration',
      title: getLocalizedText('dehydration'),
      icon: '💧',
      brief: getLocalizedText('dehydration.description'),
      detailed: getLocalizedText('dehydration.guidance'),
      status: 'attention'
    },
    {
      id: 'stress',
      title: getLocalizedText('stress.anxiety'),
      icon: '😰',
      brief: getLocalizedText('stress.anxiety.description'),
      detailed: getLocalizedText('stress.anxiety.guidance'),
      status: 'attention'
    },
    {
      id: 'lack-of-movement',
      title: getLocalizedText('sedentary.lifestyle'),
      icon: '🛋️',
      brief: getLocalizedText('sedentary.lifestyle.description'),
      detailed: getLocalizedText('sedentary.lifestyle.guidance'),
      status: 'caution'
    },
    {
      id: 'poor-posture',
      title: getLocalizedText('poor.posture'),
      icon: '🪑',
      brief: getLocalizedText('poor.posture.description'),
      detailed: getLocalizedText('poor.posture.guidance'),
      status: 'caution'
    },
    {
      id: 'inadequate-sleep',
      title: getLocalizedText('sleep.deprivation'),
      icon: '😴',
      brief: getLocalizedText('sleep.deprivation.description'),
      detailed: getLocalizedText('sleep.deprivation.guidance'),
      status: 'attention'
    },
    {
      id: 'smoking',
      title: getLocalizedText('smoking'),
      icon: '🚬',
      brief: getLocalizedText('smoking.description'),
      detailed: getLocalizedText('smoking.guidance'),
      status: 'urgent'
    },
    {
      id: 'alcohol',
      title: getLocalizedText('alcohol.consumption'),
      icon: '🍷',
      brief: getLocalizedText('alcohol.consumption.description'),
      detailed: getLocalizedText('alcohol.consumption.guidance'),
      status: 'caution'
    }
  ];


  const latePeriodsReasons = [
    {
      id: 'stress-impact',
      title: getLocalizedText('stress.emotional.factors'),
      icon: '😰',
      brief: getLocalizedText('stress.emotional.factors.description'),
      detailed: getLocalizedText('stress.emotional.factors.guidance'),
      status: 'attention'
    },
    {
      id: 'weight-changes',
      title: getLocalizedText('significant.weight.changes'),
      icon: '⚖️',
      brief: getLocalizedText('significant.weight.changes.description'),
      detailed: getLocalizedText('significant.weight.changes.guidance'),
      status: 'caution'
    },
    {
      id: 'hormonal-imbalances',
      title: getLocalizedText('hormonal.disorders'),
      icon: '🧬',
      brief: getLocalizedText('hormonal.disorders.description'),
      detailed: getLocalizedText('hormonal.disorders.guidance'),
      status: 'attention'
    },
    {
      id: 'medications',
      title: getLocalizedText('medication.effects'),
      icon: '💊',
      brief: getLocalizedText('medication.effects.description'),
      detailed: getLocalizedText('medication.effects.guidance'),
      status: 'caution'
    },
    {
      id: 'excessive-exercise',
      title: getLocalizedText('intense.physical.activity'),
      icon: '🏃‍♀️',
      brief: getLocalizedText('intense.physical.activity.description'),
      detailed: getLocalizedText('intense.physical.activity.guidance'),
      status: 'caution'
    },
    {
      id: 'illness-infection',
      title: getLocalizedText('illness.infections'),
      icon: '🤒',
      brief: getLocalizedText('illness.infections.description'),
      detailed: getLocalizedText('illness.infections.guidance'),
      status: 'caution'
    },
    {
      id: 'travel-changes',
      title: getLocalizedText('travel.time.zone.changes'),
      icon: '✈️',
      brief: getLocalizedText('travel.time.zone.changes.description'),
      detailed: getLocalizedText('travel.time.zone.changes.guidance'),
      status: 'safe'
    },
    {
      id: 'age-factors',
      title: getLocalizedText('age.related.changes'),
      icon: '📅',
      brief: getLocalizedText('age.related.changes.description'),
      detailed: getLocalizedText('age.related.changes.guidance'),
      status: 'safe'
    },
    {
      id: 'breastfeeding',
      title: getLocalizedText('breastfeeding'),
      icon: '🤱',
      brief: getLocalizedText('breastfeeding.description'),
      detailed: getLocalizedText('breastfeeding.guidance'),
      status: 'safe'
    },
    {
      id: 'sleep-disruption',
      title: getLocalizedText('sleep.pattern.changes'),
      icon: '🌙',
      brief: getLocalizedText('sleep.pattern.changes.description'),
      detailed: getLocalizedText('sleep.pattern.changes.guidance'),
      status: 'caution'
    }
  ];




  const periodLengthFactors = [
    {
      id: 'hormonal-fluctuations',
      title: getLocalizedText('natural.hormone.changes'),
      icon: '🌊',
      brief: getLocalizedText('natural.hormone.changes.description'),
      detailed: getLocalizedText('natural.hormone.changes.guidance'),
      status: 'safe'
    },
    {
      id: 'birth-control-effects',
      title: getLocalizedText('birth.control.impact'),
      icon: '💊',
      brief: getLocalizedText('birth.control.impact.description'),
      detailed: getLocalizedText('birth.control.impact.guidance'),
      status: 'safe'
    },
    {
      id: 'age-related-changes',
      title: getLocalizedText('age.life.stage'),
      icon: '📅',
      brief: getLocalizedText('age.life.stage.description'),
      detailed: getLocalizedText('age.life.stage.guidance'),
      status: 'safe'
    },
    {
      id: 'stress-lifestyle',
      title: getLocalizedText('stress.lifestyle.factors'),
      icon: '😰',
      brief: getLocalizedText('stress.lifestyle.factors.description'),
      detailed: getLocalizedText('stress.lifestyle.factors.guidance'),
      status: 'caution'
    },
    {
      id: 'underlying-conditions',
      title: getLocalizedText('medical.conditions'),
      icon: '🩺',
      brief: getLocalizedText('medical.conditions.description'),
      detailed: getLocalizedText('medical.conditions.guidance'),
      status: 'attention'
    },
    {
      id: 'medication-influence',
      title: getLocalizedText('medication.side.effects'),
      icon: '💉',
      brief: getLocalizedText('medication.side.effects.description'),
      detailed: getLocalizedText('medication.side.effects.guidance'),
      status: 'caution'
    },
    {
      id: 'nutritional-factors',
      title: getLocalizedText('diet.nutrition'),
      icon: '🥗',
      brief: getLocalizedText('diet.nutrition.description'),
      detailed: getLocalizedText('diet.nutrition.guidance'),
      status: 'caution'
    },
    {
      id: 'pregnancy-breastfeeding',
      title: getLocalizedText('pregnancy.breastfeeding'),
      icon: '🤱',
      brief: getLocalizedText('pregnancy.breastfeeding.description'),
      detailed: getLocalizedText('pregnancy.breastfeeding.guidance'),
      status: 'safe'
    },
    {
      id: 'exercise-impact',
      title: getLocalizedText('physical.activity.levels'),
      icon: '🏃‍♀️',
      brief: getLocalizedText('physical.activity.levels.description'),
      detailed: getLocalizedText('physical.activity.levels.guidance'),
      status: 'caution'
    },
    {
      id: 'when-to-worry',
      title: getLocalizedText('when.to.seek.help'),
      icon: '🚨',
      brief: getLocalizedText('when.to.seek.help.description'),
      detailed: getLocalizedText('when.to.seek.help.guidance'),
      status: 'attention'
    }
  ];


  const contraceptionTopics = [
    {
      id: 'islamic-perspective',
      title: getLocalizedText('islamic.views.on.family.planning'),
      icon: '🌙',
      brief: getLocalizedText('islamic.views.on.family.planning.description'),
      detailed: getLocalizedText('islamic.views.on.family.planning.guidance'),
      status: 'safe'
    },
    {
      id: 'natural-methods',
      title: getLocalizedText('natural.family.planning'),
      icon: '📊',
      brief: getLocalizedText('natural.family.planning.description'),
      detailed: getLocalizedText('natural.family.planning.guidance'),
      status: 'safe'
    },
    {
      id: 'barrier-methods',
      title: getLocalizedText('barrier.contraceptives'),
      icon: '🛡️',
      brief: getLocalizedText('barrier.contraceptives.description'),
      detailed: getLocalizedText('barrier.contraceptives.guidance'),
      status: 'safe'
    },
    {
      id: 'hormonal-options',
      title: getLocalizedText('hormonal.contraceptives'),
      icon: '💊',
      brief: getLocalizedText('hormonal.contraceptives.description'),
      detailed: getLocalizedText('hormonal.contraceptives.guidance'),
      status: 'caution'
    },
    {
      id: 'iud-options',
      title: getLocalizedText('intrauterine.devices'),
      icon: '🔹',
      brief: getLocalizedText('intrauterine.devices.description'),
      detailed: getLocalizedText('intrauterine.devices.guidance'),
      status: 'caution'
    },
    {
      id: 'effectiveness-rates',
      title: getLocalizedText('method.effectiveness'),
      icon: '📈',
      brief: getLocalizedText('method.effectiveness.description'),
      detailed: getLocalizedText('method.effectiveness.guidance'),
      status: 'safe'
    },
    {
      id: 'side-effects',
      title: getLocalizedText('understanding.side.effects'),
      icon: '⚠️',
      brief: getLocalizedText('understanding.side.effects.description'),
      detailed: getLocalizedText('understanding.side.effects.guidance'),
      status: 'attention'
    },
    {
      id: 'choosing-method',
      title: getLocalizedText('choosing.the.right.method'),
      icon: '🎯',
      brief: getLocalizedText('choosing.the.right.method.description'),
      detailed: getLocalizedText('choosing.the.right.method.guidance'),
      status: 'safe'
    },
    {
      id: 'emergency-contraception',
      title: getLocalizedText('emergency.contraception'),
      icon: '🚨',
      brief: getLocalizedText('emergency.contraception.description'),
      detailed: getLocalizedText('emergency.contraception.guidance'),
      status: 'urgent'
    },
    {
      id: 'consultation-importance',
      title: getLocalizedText('professional.consultation'),
      icon: '👩‍⚕️',
      brief: getLocalizedText('professional.consultation.description'),
      detailed: getLocalizedText('professional.consultation.guidance'),
      status: 'safe'
    }
  ];



  const naturalRemedies = [
    {
      id: 'heat-therapy',
      title: getLocalizedText('heat.application'),
      icon: '🔥',
      brief: getLocalizedText('heat.application.description'),
      detailed: getLocalizedText('heat.application.guidance'),
      status: 'safe'
    },
    {
      id: 'herbal-teas',
      title: getLocalizedText('herbal.remedies'),
      icon: '🫖',
      brief: getLocalizedText('herbal.remedies.description'),
      detailed: getLocalizedText('herbal.remedies.guidance'),
      status: 'safe'
    },
    {
      id: 'essential-oils',
      title: getLocalizedText('aromatherapy.and.essential.oils'),
      icon: '🌿',
      brief: getLocalizedText('aromatherapy.and.essential.oils.description'),
      detailed: getLocalizedText('aromatherapy.and.essential.oils.guidance'),
      status: 'safe'
    },
    {
      id: 'gentle-massage',
      title: getLocalizedText('abdominal.massage'),
      icon: '👐',
      brief: getLocalizedText('abdominal.massage.description'),
      detailed: getLocalizedText('abdominal.massage.guidance'),
      status: 'safe'
    },
    {
      id: 'yoga-stretches',
      title: getLocalizedText('gentle.yoga.and.stretching'),
      icon: '🧘‍♀️',
      brief: getLocalizedText('gentle.yoga.and.stretching.description'),
      detailed: getLocalizedText('gentle.yoga.and.stretching.guidance'),
      status: 'safe'
    },
    {
      id: 'sunnah-remedies',
      title: getLocalizedText('prophetic.medicine'),
      icon: '🍯',
      brief: getLocalizedText('prophetic.medicine.description'),
      detailed: getLocalizedText('prophetic.medicine.guidance'),
      status: 'safe'
    },
    {
      id: 'dietary-changes',
      title: getLocalizedText('anti.inflammatory.foods'),
      icon: '🥗',
      brief: getLocalizedText('anti.inflammatory.foods.description'),
      detailed: getLocalizedText('anti.inflammatory.foods.guidance'),
      status: 'safe'
    },
    {
      id: 'hydration',
      title: getLocalizedText('proper.hydration'),
      icon: '💧',
      brief: getLocalizedText('proper.hydration.description'),
      detailed: getLocalizedText('proper.hydration.guidance'),
      status: 'safe'
    },
    {
      id: 'magnesium-foods',
      title: getLocalizedText('magnesium.rich.foods'),
      icon: '🥜',
      brief: getLocalizedText('magnesium.rich.foods.description'),
      detailed: getLocalizedText('magnesium.rich.foods.guidance'),
      status: 'safe'
    },
    {
      id: 'rest-relaxation',
      title: getLocalizedText('rest.and.stress.management'),
      icon: '🛌',
      brief: getLocalizedText('rest.and.stress.management.description'),
      detailed: getLocalizedText('rest.and.stress.management.guidance'),
      status: 'safe'
    }
  ];



  const pregnancyHealthTopics = [
    {
      id: 'pregnancy-complications',
      title: 'Pregnancy Complications',
      icon: '⚠️',
      brief: 'Understanding risks and warning signs',
      detailed: 'Common pregnancy complications include gestational diabetes, preeclampsia, miscarriage, and preterm labor. Learn to recognize warning signs like severe headaches, vision changes, persistent vomiting, or unusual bleeding. Early detection and proper medical care can prevent serious complications.',
      status: 'attention'
    },
    {
      id: 'pregnancy-loss',
      title: 'Pregnancy Loss',
      icon: '💜',
      brief: 'Support and guidance during difficult times',
      detailed: 'Pregnancy loss affects many women and can be emotionally devastating. Seek support from healthcare providers, counselors, and Islamic guidance for healing. Remember that Allah tests those He loves, and healing takes time. Consider joining support groups and allowing yourself to grieve.',
      status: 'attention'
    },
    {
      id: 'working-moms',
      title: 'Working Moms',
      icon: '👩🏽‍💼',
      brief: 'Balancing career and motherhood',
      detailed: 'Balancing work and motherhood requires support, planning, and flexibility. Communicate with employers about needs, establish routines, and seek help when needed. Remember that being a working mother is part of many women\'s journeys, and Allah has made mothers strong for this purpose.',
      status: 'safe'
    },
    {
      id: 'sleep-eating',
      title: 'Sleep & Eating',
      icon: '🍎',
      brief: 'Managing nutrition and rest during pregnancy/postpartum',
      detailed: 'Proper nutrition and adequate sleep are crucial during pregnancy and postpartum. Eat regular meals with iron, folate, and calcium. Sleep when possible, especially with newborns. Ask family for help and prioritize rest as it\'s essential for recovery and breastfeeding.',
      status: 'safe'
    },
    {
      id: 'mental-health',
      title: 'Mental Health',
      icon: '🧠',
      brief: 'Supporting emotional wellbeing',
      detailed: 'Perinatal mental health issues affect many women. Symptoms include persistent sadness, anxiety, difficulty bonding, or thoughts of harm. Seek professional help immediately if experiencing these symptoms. Islamic counseling, prayer, and community support are important parts of healing.',
      status: 'attention'
    },
    {
      id: 'contraception',
      title: 'Contraception',
      icon: '💊',
      brief: 'Family planning options and Islamic guidance',
      detailed: 'Islam allows family planning for valid reasons. Options include hormonal methods, barrier methods, and natural family planning. Consult with healthcare providers and Islamic scholars to choose methods that align with your health needs and religious beliefs.',
      status: 'safe'
    },
    {
      id: 'birthing-while-black',
      title: 'Birthing While Black',
      icon: '🛡️',
      brief: 'Addressing maternal health disparities',
      detailed: 'Black women face higher rates of maternal mortality and complications. Advocate for yourself, bring support persons to appointments, know warning signs, and don\'t hesitate to seek second opinions. Find culturally competent healthcare providers who listen to your concerns.',
      status: 'attention'
    },
    {
      id: 'marriage-new-baby',
      title: 'Marriage & New Baby',
      icon: '👶🏽',
      brief: 'Relationship changes with parenthood',
      detailed: 'A new baby brings joy but also stress to marriages. Communication, patience, and mutual support are key. Share responsibilities, maintain intimacy when appropriate, and remember that this is a temporary phase. Seek counseling if needed and pray together as a family.',
      status: 'safe'
    },
    {
      id: 'sexual-health',
      title: 'Sexual Health',
      icon: '💖',
      brief: 'Intimate wellness and education',
      detailed: 'Sexual health includes understanding your body, communicating with your spouse, and addressing concerns like pain during intimacy or changes in desire. Seek medical care for persistent issues and remember that intimate health is part of overall wellbeing.',
      status: 'safe'
    },
    {
      id: 'after-birth',
      title: 'After Birth',
      icon: '🤱🏽',
      brief: 'Postpartum recovery and care',
      detailed: 'Postpartum recovery varies for each woman. Physical healing includes wound care, bleeding management, and gradually returning to activities. Emotional recovery includes bonding, mood changes, and adjusting to motherhood. Rest, proper nutrition, and support are essential.',
      status: 'safe'
    },
    {
      id: 'intimacy-bleeding',
      title: 'Intimacy & Bleeding',
      icon: '🩸',
      brief: 'Understanding changes and healing after childbirth',
      detailed: 'Postpartum bleeding (lochia) is normal for 4-6 weeks after delivery. Intimacy should wait until cleared by healthcare providers, usually 6-8 weeks. Healing time varies, and some women experience changes in sensation or comfort. Communication with your spouse and patience are important.',
      status: 'caution'
    },
    {
      id: 'thyroid-health',
      title: 'Thyroid Health',
      icon: '🔬',
      brief: 'Managing thyroid conditions during pregnancy',
      detailed: 'Thyroid disorders affect pregnancy and postpartum periods. Hypothyroidism can cause fatigue, weight gain, and pregnancy complications. Hyperthyroidism can cause rapid heartbeat and weight loss. Regular monitoring and medication adjustments are important for mother and baby\'s health.',
      status: 'attention'
    },
    {
      id: 'diabetes',
      title: 'Diabetes',
      icon: '📊',
      brief: 'Blood sugar management during pregnancy',
      detailed: 'Gestational diabetes develops during pregnancy and requires careful monitoring. Manage through diet, exercise, and sometimes medication. Monitor blood sugar levels regularly and follow healthcare provider guidance. Most women return to normal blood sugar levels after delivery.',
      status: 'attention'
    },
    {
      id: 'fgm-support',
      title: 'FGM Support',
      icon: '🤝',
      brief: 'Healing and support resources for survivors',
      detailed: 'Female Genital Mutilation/Cutting can affect pregnancy, childbirth, and intimacy. Seek specialized healthcare providers familiar with FGM/C. Counseling, support groups, and sometimes reconstructive procedures can help. Remember that healing is possible and you deserve compassionate care.',
      status: 'attention'
    },
    {
      id: 'hormonal-changes',
      title: 'Hormonal Changes',
      icon: '📈',
      brief: 'Understanding your body\'s transitions',
      detailed: 'Hormonal changes occur throughout a woman\'s life - menstruation, pregnancy, postpartum, and menopause. These affect mood, energy, weight, and overall health. Understanding these changes helps you prepare and seek appropriate care when needed.',
      status: 'safe'
    },
    {
      id: 'preeclampsia',
      title: 'Pre-eclampsia',
      icon: '🚨',
      brief: 'Recognition and management of serious pregnancy condition',
      detailed: 'Pre-eclampsia is a serious pregnancy complication involving high blood pressure and protein in urine. Warning signs include severe headaches, vision changes, upper abdominal pain, and sudden swelling. Immediate medical attention is crucial as it can be life-threatening for mother and baby.',
      status: 'urgent'
    },
    {
      id: 'c-section-care',
      title: 'C-Section Care',
      icon: '🏥',
      brief: 'Recovery and wound care guidance',
      detailed: 'C-section recovery involves wound care, gradual activity increase, and pain management. Keep incision clean and dry, avoid heavy lifting for 6-8 weeks, and watch for signs of infection. Emotional recovery is also important - some women experience feelings about not having a vaginal birth.',
      status: 'safe'
    }
  ];


  const [settings, setSettings] = useState({
    // Notifications
    periodReminders: true,
    ovulationAlerts: true,
    symptomsTracking: false,
    dailyCheckIns: true,
    latePerodAlerts: true,
    fertilityInsights: true,
    medicationReminders: false,
    appointmentReminders: true,
    cycleAnalysis: true,
    // Privacy
    biometricLock: false,
    passcodeRequired: false,
    hideFromRecents: false,
    incognitoMode: false,
    dataEncryption: true,
    locationTracking: false,
    crashReporting: true,
    // Display
    darkMode: false,
    compactView: false,
    showEmojis: true,
    colorfulTheme: true,
    highContrast: false,
    fontSize: 'medium',
    // Data
    autoBackup: true,
    syncEnabled: true,
    offlineMode: false,
    dataExport: true,
    // Advanced
    developerMode: false,
    betaFeatures: false,
    analytics: true
  });


  useEffect(() => {

    // Load saved settings with comprehensive state management
    const savedSettings = localStorage.getItem('nurcycle-app-settings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(prev => ({ ...prev, ...parsedSettings }));

        if (parsedSettings.darkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
    else {
      document.documentElement.classList.remove('dark');
    }

  }, []);

  const getTopicContent = (topicTitle) => {
    const contentMap = {
      // "Pregnancy Complications": [
      //   { icon: "🚨", title: "Warning Signs", description: "Recognize emergency symptoms requiring immediate medical attention" },
      //   { icon: "🩸", title: "Bleeding Issues", description: "Understanding different types of bleeding during pregnancy" },
      //   { icon: "🤢", title: "Severe Morning Sickness", description: "Managing hyperemesis gravidarum and severe nausea" },
      //   { icon: "💔", title: "High Blood Pressure", description: "Monitoring and managing pregnancy-related hypertension" },
      //   { icon: "🍼", title: "Gestational Diabetes", description: "Blood sugar management during pregnancy" },
      //   { icon: "🧬", title: "Genetic Concerns", description: "Understanding genetic testing and chromosomal abnormalities" },
      //   { icon: "⚖️", title: "Weight Management", description: "Healthy weight gain and complications from over/under gaining" },
      //   { icon: "🫁", title: "Breathing Problems", description: "Managing respiratory issues and when to seek help" },
      //   { icon: "🦴", title: "Physical Changes", description: "Dealing with back pain, joint issues, and physical discomfort" },
      //   { icon: "📱", title: "When to Call Doctor", description: "Emergency contact guidelines and red flag symptoms" }
      // ]
      [getLocalizedText('pregnancy.complications')]: [
        {
          icon: "🚨",
          title: getLocalizedText('pregnancy.warning.signs'),
          description: getLocalizedText('desc.warning.signs')
        },
        {
          icon: "🩸",
          title: getLocalizedText('pregnancy.bleeding'),
          description: getLocalizedText('desc.bleeding')
        },
        {
          icon: "🤢",
          title: getLocalizedText('pregnancy.morning.sickness'),
          description: getLocalizedText('desc.morning.sickness')
        },
        {
          icon: "💔",
          title: getLocalizedText('pregnancy.bp'),
          description: getLocalizedText('desc.bp')
        },
        {
          icon: "🍼",
          title: getLocalizedText('pregnancy.gestational.diabetes'),
          description: getLocalizedText('desc.gestational.diabetes')
        },
        {
          icon: "🧬",
          title: getLocalizedText('pregnancy.genetic'),
          description: getLocalizedText('desc.genetic')
        },
        {
          icon: "⚖️",
          title: getLocalizedText('pregnancy.weight'),
          description: getLocalizedText('desc.weight')
        },
        {
          icon: "🫁",
          title: getLocalizedText('pregnancy.breathing'),
          description: getLocalizedText('desc.breathing')
        },
        {
          icon: "🦴",
          title: getLocalizedText('pregnancy.physical.changes'),
          description: getLocalizedText('desc.physical.changes')
        },
        {
          icon: "📱",
          title: getLocalizedText('pregnancy.call.doctor'),
          description: getLocalizedText('desc.call.doctor')
        }
      ],

      [getLocalizedText('category.pregnancy.loss')]: [

        // { icon: "💜", title: "Types of Loss", description: "Understanding miscarriage, stillbirth, and infant loss" },
        // { icon: "🤝", title: "Emotional Support", description: "Grief counseling and emotional healing resources" },
        // { icon: "👨‍👩‍👧‍👦", title: "Partner Support", description: "How partners can support each other through loss" },
        // { icon: "📅", title: "Recovery Timeline", description: "Physical and emotional recovery expectations" },
        // { icon: "🏥", title: "Medical Care", description: "Follow-up care and medical procedures after loss" },
        // { icon: "👶", title: "Future Pregnancies", description: "Planning and preparing for subsequent pregnancies" },
        // { icon: "💭", title: "Memory Making", description: "Creating lasting memories and honoring your baby" },
        // { icon: "🌟", title: "Support Groups", description: "Finding community with others who understand" },
        // { icon: "📖", title: "Resources", description: "Books, websites, and professional help options" },
        // { icon: "💐", title: "Healing Rituals", description: "Meaningful ways to process grief and find peace" }

        {
          icon: "💜",
          title: getLocalizedText('loss.types'),
          description: getLocalizedText('desc.loss.types')
        },
        {
          icon: "🤝",
          title: getLocalizedText('loss.emotional'),
          description: getLocalizedText('desc.loss.emotional')
        },
        {
          icon: "👨‍👩‍👧‍👦",
          title: getLocalizedText('loss.partner'),
          description: getLocalizedText('desc.loss.partner')
        },
        {
          icon: "📅",
          title: getLocalizedText('loss.timeline'),
          description: getLocalizedText('desc.loss.timeline')
        },
        {
          icon: "🏥",
          title: getLocalizedText('loss.medical'),
          description: getLocalizedText('desc.loss.medical')
        },
        {
          icon: "👶",
          title: getLocalizedText('loss.future'),
          description: getLocalizedText('desc.loss.future')
        },
        {
          icon: "💭",
          title: getLocalizedText('loss.memory'),
          description: getLocalizedText('desc.loss.memory')
        },
        {
          icon: "🌟",
          title: getLocalizedText('loss.groups'),
          description: getLocalizedText('desc.loss.groups')
        },
        {
          icon: "📖",
          title: getLocalizedText('loss.resources'),
          description: getLocalizedText('desc.loss.resources')
        },
        {
          icon: "💐",
          title: getLocalizedText('loss.rituals'),
          description: getLocalizedText('desc.loss.rituals')
        }

      ],

      [getLocalizedText('category.working.moms')]: [

        // { icon: "⏰", title: "Time Management", description: "Balancing work deadlines with family time effectively" },
        // { icon: "👶", title: "Childcare Options", description: "Finding reliable daycare, nannies, and family support" },
        // { icon: "🤱", title: "Breastfeeding at Work", description: "Pumping schedules and workplace lactation support" },
        // { icon: "💼", title: "Career Advancement", description: "Navigating promotions and professional growth as a mother" },
        // { icon: "😴", title: "Managing Fatigue", description: "Energy management and prioritizing rest and self-care" },
        // { icon: "🏠", title: "Work-Life Balance", description: "Setting boundaries between professional and personal life" },
        // { icon: "👥", title: "Support Networks", description: "Building relationships with other working parents" },
        // { icon: "💰", title: "Financial Planning", description: "Budgeting for childcare and family expenses" },
        // { icon: "🎯", title: "Goal Setting", description: "Adjusting career goals and expectations realistically" },
        // { icon: "🌟", title: "Self-Care", description: "Maintaining personal wellness while juggling responsibilities" }

        {
          icon: "⏰",
          title: getLocalizedText('work.time'),
          description: getLocalizedText('work.deadlines')
        },
        {
          icon: "👶",
          title: getLocalizedText('work.childcare'),
          description: getLocalizedText('work.daycare')
        },
        {
          icon: "🤱",
          title: getLocalizedText('work.breastfeeding'),
          description: getLocalizedText('work.pumping')
        },
        {
          icon: "💼",
          title: getLocalizedText('work.career'),
          description: getLocalizedText('work.promotions')
        },
        {
          icon: "😴",
          title: getLocalizedText('work.fatigue'),
          description: getLocalizedText('work.energy')
        },
        {
          icon: "🏠",
          title: getLocalizedText('work.balance'),
          description: getLocalizedText('work.boundaries')
        },
        {
          icon: "👥",
          title: getLocalizedText('work.networks'),
          description: getLocalizedText('work.relationships')
        },
        {
          icon: "💰",
          title: getLocalizedText('work.finance'),
          description: getLocalizedText('work.budgeting')
        },
        {
          icon: "🎯",
          title: getLocalizedText('work.goals'),
          description: getLocalizedText('work.adjusting')
        },
        {
          icon: "🌟",
          title: getLocalizedText('work.selfcare'),
          description: getLocalizedText('work.wellness')
        }

      ],



      [getLocalizedText('category.sleep.eating')]: [

        // { icon: "😴", title: "Sleep Hygiene", description: "Creating optimal sleep environment and bedtime routines" },
        // { icon: "🍎", title: "Nutritional Needs", description: "Essential nutrients during pregnancy and breastfeeding" },
        // { icon: "⏰", title: "Meal Planning", description: "Preparing healthy meals when time and energy are limited" },
        // { icon: "🤢", title: "Managing Nausea", description: "Foods and strategies to reduce morning sickness" },
        // { icon: "💧", title: "Hydration", description: "Staying properly hydrated throughout pregnancy and postpartum" },
        // { icon: "🥗", title: "Healthy Snacking", description: "Nutritious snack options for busy parents" },
        // { icon: "😪", title: "Sleep Deprivation", description: "Coping with interrupted sleep and recovery strategies" },
        // { icon: "🍽️", title: "Eating Disorders", description: "Managing relationship with food during body changes" },
        // { icon: "⚡", title: "Energy Boosters", description: "Natural ways to increase energy without caffeine" },
        // { icon: "🛏️", title: "Rest Strategies", description: "Power napping and rest techniques for busy mothers" }

        {
          icon: "😴",
          title: getLocalizedText('sleep.hygiene'),
          description: getLocalizedText('desc.sleep.hygiene')
        },
        {
          icon: "🍎",
          title: getLocalizedText('nutrition.needs'),
          description: getLocalizedText('desc.nutrition.needs')
        },
        {
          icon: "⏰",
          title: getLocalizedText('meal.planning'),
          description: getLocalizedText('desc.meal.planning')
        },
        {
          icon: "🤢",
          title: getLocalizedText('managing.nausea'),
          description: getLocalizedText('desc.managing.nausea')
        },
        {
          icon: "💧",
          title: getLocalizedText('hydration'),
          description: getLocalizedText('desc.hydration')
        },
        {
          icon: "🥗",
          title: getLocalizedText('healthy.snacking'),
          description: getLocalizedText('desc.healthy.snacking')
        },
        {
          icon: "😪",
          title: getLocalizedText('sleep.deprivation'),
          description: getLocalizedText('desc.sleep.deprivation')
        },
        {
          icon: "🍽️",
          title: getLocalizedText('eating.disorders'),
          description: getLocalizedText('desc.eating.disorders')
        },
        {
          icon: "⚡",
          title: getLocalizedText('energy.boosters'),
          description: getLocalizedText('desc.energy.boosters')
        },
        {
          icon: "🛏️",
          title: getLocalizedText('rest.strategies'),
          description: getLocalizedText('desc.rest.strategies')
        }

      ],


      [getLocalizedText('category.mental.health')]: [

        // { icon: "🧠", title: "Postpartum Depression", description: "Recognizing symptoms and seeking professional help" },
        // { icon: "😰", title: "Anxiety Management", description: "Coping strategies for pregnancy and parenting anxiety" },
        // { icon: "💊", title: "Medication Safety", description: "Mental health medications during pregnancy and breastfeeding" },
        // { icon: "🗣️", title: "Therapy Options", description: "Different types of counseling and mental health support" },
        // { icon: "🧘", title: "Mindfulness", description: "Meditation and mindfulness practices for emotional wellness" },
        // { icon: "👥", title: "Support Systems", description: "Building and maintaining emotional support networks" },
        // { icon: "🌈", title: "Mood Changes", description: "Understanding hormonal impacts on mental health" },
        // { icon: "💪", title: "Coping Skills", description: "Healthy strategies for managing stress and overwhelm" },
        // { icon: "📱", title: "Crisis Resources", description: "Emergency mental health contacts and hotlines" },
        // { icon: "🌟", title: "Self-Advocacy", description: "Speaking up about mental health needs with healthcare providers" }

        {
          icon: "🧠",
          title: getLocalizedText('mental.postpartum'),
          description: getLocalizedText('mental.postpartum.desc')
        },
        {
          icon: "😰",
          title: getLocalizedText('mental.anxiety'),
          description: getLocalizedText('mental.anxiety.desc')
        },
        {
          icon: "💊",
          title: getLocalizedText('mental.medication'),
          description: getLocalizedText('mental.medication.desc')
        },
        {
          icon: "🗣️",
          title: getLocalizedText('mental.therapy'),
          description: getLocalizedText('mental.therapy.desc')
        },
        {
          icon: "🧘",
          title: getLocalizedText('mental.mindfulness'),
          description: getLocalizedText('mental.mindfulness.desc')
        },
        {
          icon: "👥",
          title: getLocalizedText('mental.support'),
          description: getLocalizedText('mental.support.desc')
        },
        {
          icon: "🌈",
          title: getLocalizedText('mental.mood'),
          description: getLocalizedText('mental.mood.desc')
        },
        {
          icon: "💪",
          title: getLocalizedText('mental.coping'),
          description: getLocalizedText('mental.coping.desc')
        },
        {
          icon: "📱",
          title: getLocalizedText('mental.crisis'),
          description: getLocalizedText('mental.crisis.desc')
        },
        {
          icon: "🌟",
          title: getLocalizedText('mental.advocacy'),
          description: getLocalizedText('mental.advocacy.desc')
        }

      ],

      [getLocalizedText('contraception')]: [

        // { icon: "💊", title: "Birth Control Pills", description: "Types, effectiveness, and side effects of oral contraceptives" },
        // { icon: "🛡️", title: "IUD Options", description: "Hormonal and copper IUD insertion, removal, and care" },
        // { icon: "💉", title: "Injectable Methods", description: "Depo-Provera and other long-acting injectable contraceptives" },
        // { icon: "🔒", title: "Barrier Methods", description: "Condoms, diaphragms, and cervical caps for pregnancy prevention" },
        // { icon: "📅", title: "Natural Methods", description: "Fertility awareness and rhythm method family planning" },
        // { icon: "⚕️", title: "Emergency Contraception", description: "Plan B and other emergency birth control options" },
        // { icon: "✂️", title: "Permanent Options", description: "Tubal ligation and other sterilization procedures" },
        // { icon: "🤱", title: "Breastfeeding", description: "Contraception options safe during breastfeeding" },
        // { icon: "💰", title: "Cost and Access", description: "Insurance coverage and affordable contraception resources" },
        // { icon: "🩺", title: "Choosing Methods", description: "Working with healthcare providers to select best option" }

        {
          icon: "💊",
          title: getLocalizedText('contraception.pills'),
          description: getLocalizedText('contraception.pills.desc')
        },
        {
          icon: "🛡️",
          title: getLocalizedText('contraception.iud'),
          description: getLocalizedText('contraception.iud.desc')
        },
        {
          icon: "💉",
          title: getLocalizedText('contraception.injectable'),
          description: getLocalizedText('contraception.injectable.desc')
        },
        {
          icon: "🔒",
          title: getLocalizedText('contraception.barrier'),
          description: getLocalizedText('contraception.barrier.desc')
        },
        {
          icon: "📅",
          title: getLocalizedText('contraception.natural'),
          description: getLocalizedText('contraception.natural.desc')
        },
        {
          icon: "⚕️",
          title: getLocalizedText('contraception.emergency'),
          description: getLocalizedText('contraception.emergency.desc')
        },
        {
          icon: "✂️",
          title: getLocalizedText('contraception.permanent'),
          description: getLocalizedText('contraception.permanent.desc')
        },
        {
          icon: "🤱",
          title: getLocalizedText('contraception.breastfeeding'),
          description: getLocalizedText('contraception.breastfeeding.desc')
        },
        {
          icon: "💰",
          title: getLocalizedText('contraception.cost'),
          description: getLocalizedText('contraception.cost.desc')
        },
        {
          icon: "🩺",
          title: getLocalizedText('contraception.choosing'),
          description: getLocalizedText('contraception.choosing.desc')
        }
      ],


      [getLocalizedText('category.birthing.black')]: [

        // { icon: "🛡️", title: "Health Disparities", description: "Understanding maternal mortality rates and systemic issues" },
        // { icon: "🗣️", title: "Self-Advocacy", description: "Speaking up for your needs and preferences during care" },
        // { icon: "👩‍⚕️", title: "Provider Selection", description: "Finding culturally competent healthcare providers" },
        // { icon: "📋", title: "Birth Plans", description: "Creating comprehensive birth plans that address your concerns" },
        // { icon: "👥", title: "Support Teams", description: "Building a strong support network including doulas" },
        // { icon: "📊", title: "Know Your Rights", description: "Understanding patient rights and informed consent" },
        // { icon: "🏥", title: "Hospital Advocacy", description: "Navigating hospital systems and advocating for quality care" },
        // { icon: "💪", title: "Empowerment", description: "Building confidence to advocate for yourself and your baby" },
        // { icon: "🌟", title: "Resources", description: "Organizations and resources specifically for Black mothers" },
        // { icon: "📚", title: "Education", description: "Learning about risks and how to minimize them" }

        {
          icon: "🛡️",
          title: getLocalizedText('health.disparities'),
          description: getLocalizedText('health.disparities.desc')
        },
        {
          icon: "🗣️",
          title: getLocalizedText('health.advocacy'),
          description: getLocalizedText('health.advocacy.desc')
        },
        {
          icon: "👩‍⚕️",
          title: getLocalizedText('health.provider'),
          description: getLocalizedText('health.provider.desc')
        },
        {
          icon: "📋",
          title: getLocalizedText('health.birthplan'),
          description: getLocalizedText('health.birthplan.desc')
        },
        {
          icon: "👥",
          title: getLocalizedText('health.support'),
          description: getLocalizedText('health.support.desc')
        },
        {
          icon: "📊",
          title: getLocalizedText('health.rights'),
          description: getLocalizedText('health.rights.desc')
        },
        {
          icon: "🏥",
          title: getLocalizedText('health.hospital'),
          description: getLocalizedText('health.hospital.desc')
        },
        {
          icon: "💪",
          title: getLocalizedText('health.empower'),
          description: getLocalizedText('health.empower.desc')
        },
        {
          icon: "🌟",
          title: getLocalizedText('health.resources'),
          description: getLocalizedText('health.resources.desc')
        },
        {
          icon: "📚",
          title: getLocalizedText('health.education'),
          description: getLocalizedText('health.education.desc')
        }
      ],


      [getLocalizedText('category.marriage.baby')]: [

        // { icon: "💕", title: "Relationship Changes", description: "How becoming parents affects romantic relationships" },
        // { icon: "🗣️", title: "Communication", description: "Maintaining open dialogue during stressful transitions" },
        // { icon: "⚖️", title: "Responsibility Sharing", description: "Dividing childcare and household duties fairly" },
        // { icon: "💤", title: "Intimacy Challenges", description: "Navigating physical and emotional intimacy changes" },
        // { icon: "💰", title: "Financial Stress", description: "Managing money tensions with new family expenses" },
        // { icon: "👥", title: "Extended Family", description: "Setting boundaries with in-laws and family members" },
        // { icon: "⏰", title: "Couple Time", description: "Making time for each other amid parenting demands" },
        // { icon: "🎯", title: "Goal Alignment", description: "Ensuring you're working toward shared family goals" },
        // { icon: "💔", title: "Conflict Resolution", description: "Healthy ways to handle disagreements and stress" },
        // { icon: "🌟", title: "Strengthening Bond", description: "Activities and practices to deepen your connection" }

        {
          icon: "💕",
          title: getLocalizedText('relationship.changes'),
          description: getLocalizedText('relationship.changes.desc')
        },
        {
          icon: "🗣️",
          title: getLocalizedText('relationship.communication'),
          description: getLocalizedText('relationship.communication.desc')
        },
        {
          icon: "⚖️",
          title: getLocalizedText('relationship.responsibility'),
          description: getLocalizedText('relationship.responsibility.desc')
        },
        {
          icon: "💤",
          title: getLocalizedText('relationship.intimacy'),
          description: getLocalizedText('relationship.intimacy.desc')
        },
        {
          icon: "💰",
          title: getLocalizedText('relationship.financial'),
          description: getLocalizedText('relationship.financial.desc')
        },
        {
          icon: "👥",
          title: getLocalizedText('relationship.family'),
          description: getLocalizedText('relationship.family.desc')
        },
        {
          icon: "⏰",
          title: getLocalizedText('relationship.couple'),
          description: getLocalizedText('relationship.couple.desc')
        },
        {
          icon: "🎯",
          title: getLocalizedText('relationship.goals'),
          description: getLocalizedText('relationship.goals.desc')
        },
        {
          icon: "💔",
          title: getLocalizedText('relationship.conflict'),
          description: getLocalizedText('relationship.conflict.desc')
        },
        {
          icon: "🌟",
          title: getLocalizedText('relationship.bond'),
          description: getLocalizedText('relationship.bond.desc')
        }

      ],

      [getLocalizedText("category.sexual.health")]: [

        // { icon: "💖", title: "Intimacy During Pregnancy", description: "Safe sex practices and comfort during pregnancy" },
        // { icon: "🩺", title: "STI Prevention", description: "Testing, prevention, and treatment of sexually transmitted infections" },
        // { icon: "🤱", title: "Postpartum Recovery", description: "When and how to resume sexual activity after childbirth" },
        // { icon: "💊", title: "Contraception", description: "Birth control options and family planning" },
        // { icon: "😔", title: "Low Libido", description: "Understanding and addressing changes in sexual desire" },
        // { icon: "💧", title: "Vaginal Health", description: "Maintaining vaginal health and addressing concerns" },
        // { icon: "🗣️", title: "Communication", description: "Talking openly with partners about sexual needs and concerns" },
        // { icon: "⚕️", title: "Healthcare", description: "Regular gynecological care and sexual health screenings" },
        // { icon: "🧠", title: "Mental Health", description: "How mental health affects sexual wellness and vice versa" },
        // { icon: "📚", title: "Education", description: "Learning about sexual anatomy, pleasure, and health" }

        {
          icon: "💖",
          title: getLocalizedText('intimacy.pregnancy'),
          description: getLocalizedText('intimacy.pregnancy.desc')
        },
        {
          icon: "🩺",
          title: getLocalizedText('intimacy.sti'),
          description: getLocalizedText('intimacy.sti.desc')
        },
        {
          icon: "🤱",
          title: getLocalizedText('intimacy.postpartum'),
          description: getLocalizedText('intimacy.postpartum.desc')
        },
        {
          icon: "💊",
          title: getLocalizedText('intimacy.contraception'),
          description: getLocalizedText('intimacy.contraception.desc')
        },
        {
          icon: "😔",
          title: getLocalizedText('intimacy.libido'),
          description: getLocalizedText('intimacy.libido.desc')
        },
        {
          icon: "💧",
          title: getLocalizedText('intimacy.vaginal'),
          description: getLocalizedText('intimacy.vaginal.desc')
        },
        {
          icon: "🗣️",
          title: getLocalizedText('intimacy.communication'),
          description: getLocalizedText('intimacy.communication.desc')
        },
        {
          icon: "⚕️",
          title: getLocalizedText('intimacy.healthcare'),
          description: getLocalizedText('intimacy.healthcare.desc')
        },
        {
          icon: "🧠",
          title: getLocalizedText('intimacy.mental'),
          description: getLocalizedText('intimacy.mental.desc')
        },
        {
          icon: "📚",
          title: getLocalizedText('intimacy.education'),
          description: getLocalizedText('intimacy.education.desc')
        }

      ],

      [getLocalizedText('category.after.birth')]: [

        // { icon: "🩸", title: "Postpartum Bleeding", description: "Normal lochia and when to be concerned about bleeding" },
        // { icon: "🤱", title: "Breastfeeding", description: "Establishing milk supply and troubleshooting common issues" },
        // { icon: "😴", title: "Sleep Recovery", description: "Adjusting to newborn sleep patterns and getting rest" },
        // { icon: "💪", title: "Physical Recovery", description: "Healing from vaginal or cesarean delivery" },
        // { icon: "🧠", title: "Emotional Changes", description: "Baby blues, mood swings, and postpartum mental health" },
        // { icon: "🍽️", title: "Nutrition", description: "Postpartum nutrition for healing and breastfeeding" },
        // { icon: "👶", title: "Newborn Care", description: "Learning to care for your baby's basic needs" },
        // { icon: "🏥", title: "Follow-up Care", description: "Postpartum checkups and when to call your provider" },
        // { icon: "👥", title: "Support Systems", description: "Building help networks for postpartum period" },
        // { icon: "🌟", title: "Self-Care", description: "Taking care of yourself while caring for your baby" }

        {
          icon: "🩸",
          title: getLocalizedText('after.bleeding'),
          description: getLocalizedText('after.bleeding.desc')
        },
        {
          icon: "🤱",
          title: getLocalizedText('after.breastfeeding'),
          description: getLocalizedText('after.breastfeeding.desc')
        },
        {
          icon: "😴",
          title: getLocalizedText('after.sleep'),
          description: getLocalizedText('after.sleep.desc')
        },
        {
          icon: "💪",
          title: getLocalizedText('after.physical'),
          description: getLocalizedText('after.physical.desc')
        },
        {
          icon: "🧠",
          title: getLocalizedText('after.emotional'),
          description: getLocalizedText('after.emotional.desc')
        },
        {
          icon: "🍽️",
          title: getLocalizedText('after.nutrition'),
          description: getLocalizedText('after.nutrition.desc')
        },
        {
          icon: "👶",
          title: getLocalizedText('after.newborn'),
          description: getLocalizedText('after.newborn.desc')
        },
        {
          icon: "🏥",
          title: getLocalizedText('after.followup'),
          description: getLocalizedText('after.followup.desc')
        },
        {
          icon: "👥",
          title: getLocalizedText('after.support'),
          description: getLocalizedText('after.support.desc')
        },
        {
          icon: "🌟",
          title: getLocalizedText('after.selfcare'),
          description: getLocalizedText('after.selfcare.desc')
        }

      ],

      [getLocalizedText("category.intimacy.bleeding")]: [

        // { icon: "💕", title: "Resuming Intimacy", description: "When and how to resume sexual activity after birth" },
        // { icon: "🩸", title: "Bleeding Patterns", description: "Understanding postpartum bleeding and what's normal" },
        // { icon: "😣", title: "Pain Management", description: "Dealing with discomfort during recovery and intimacy" },
        // { icon: "💧", title: "Lubrication", description: "Addressing vaginal dryness and using appropriate lubricants" },
        // { icon: "🗣️", title: "Partner Communication", description: "Talking openly about physical and emotional needs" },
        // { icon: "⏰", title: "Timing Recovery", description: "Individual healing timelines and being patient with process" },
        // { icon: "🩺", title: "Medical Clearance", description: "Getting healthcare provider approval before resuming activity" },
        // { icon: "💪", title: "Pelvic Floor", description: "Strengthening exercises and pelvic floor rehabilitation" },
        // { icon: "🧠", title: "Emotional Readiness", description: "Mental and emotional preparation for intimacy" },
        // { icon: "🌟", title: "New Normal", description: "Adjusting expectations and finding what works for you" }

        {
          icon: "💕",
          title: getLocalizedText('intimacy.resume'),
          description: getLocalizedText('intimacy.resume.desc')
        },
        {
          icon: "🩸",
          title: getLocalizedText('intimacy.bleeding'),
          description: getLocalizedText('intimacy.bleeding.desc')
        },
        {
          icon: "😣",
          title: getLocalizedText('intimacy.pain'),
          description: getLocalizedText('intimacy.pain.desc')
        },
        {
          icon: "💧",
          title: getLocalizedText('intimacy.lubrication'),
          description: getLocalizedText('intimacy.lubrication.desc')
        },
        {
          icon: "🗣️",
          title: getLocalizedText('intimacy.partner'),
          description: getLocalizedText('intimacy.partner.desc')
        },
        {
          icon: "⏰",
          title: getLocalizedText('intimacy.timing'),
          description: getLocalizedText('intimacy.timing.desc')
        },
        {
          icon: "🩺",
          title: getLocalizedText('intimacy.clearance'),
          description: getLocalizedText('intimacy.clearance.desc')
        },
        {
          icon: "💪",
          title: getLocalizedText('intimacy.pelvic'),
          description: getLocalizedText('intimacy.pelvic.desc')
        },
        {
          icon: "🧠",
          title: getLocalizedText('intimacy.emotional'),
          description: getLocalizedText('intimacy.emotional.desc')
        },
        {
          icon: "🌟",
          title: getLocalizedText('intimacy.normal'),
          description: getLocalizedText('intimacy.normal.desc')
        }

      ],

      [getLocalizedText("category.thyroid")]: [

        // { icon: "🔬", title: "Thyroid Function", description: "Understanding how thyroid hormones affect pregnancy and health" },
        // { icon: "📊", title: "Testing", description: "When and how often to test thyroid levels during pregnancy" },
        // { icon: "💊", title: "Medication Management", description: "Adjusting thyroid medications during pregnancy and breastfeeding" },
        // { icon: "⚠️", title: "Hypothyroidism", description: "Managing underactive thyroid during pregnancy" },
        // { icon: "⚡", title: "Hyperthyroidism", description: "Dealing with overactive thyroid and pregnancy complications" },
        // { icon: "👶", title: "Baby's Health", description: "How maternal thyroid health affects fetal development" },
        // { icon: "🍽️", title: "Nutrition", description: "Dietary considerations for thyroid health" },
        // { icon: "😴", title: "Symptoms", description: "Recognizing thyroid-related symptoms vs. pregnancy symptoms" },
        // { icon: "🏥", title: "Specialist Care", description: "Working with endocrinologists and maternal-fetal medicine" },
        // { icon: "📅", title: "Postpartum", description: "Thyroid changes and monitoring after delivery" }

        {
          icon: "🔬",
          title: getLocalizedText('thyroid.function'),
          description: getLocalizedText('thyroid.function.desc')
        },
        {
          icon: "📊",
          title: getLocalizedText('thyroid.testing'),
          description: getLocalizedText('thyroid.testing.desc')
        },
        {
          icon: "💊",
          title: getLocalizedText('thyroid.medication'),
          description: getLocalizedText('thyroid.medication.desc')
        },
        {
          icon: "⚠️",
          title: getLocalizedText('thyroid.hypo'),
          description: getLocalizedText('thyroid.hypo.desc')
        },
        {
          icon: "⚡",
          title: getLocalizedText('thyroid.hyper'),
          description: getLocalizedText('thyroid.hyper.desc')
        },
        {
          icon: "👶",
          title: getLocalizedText('thyroid.baby'),
          description: getLocalizedText('thyroid.baby.desc')
        },
        {
          icon: "🍽️",
          title: getLocalizedText('thyroid.nutrition'),
          description: getLocalizedText('thyroid.nutrition.desc')
        },
        {
          icon: "😴",
          title: getLocalizedText('thyroid.symptoms'),
          description: getLocalizedText('thyroid.symptoms.desc')
        },
        {
          icon: "🏥",
          title: getLocalizedText('thyroid.specialist'),
          description: getLocalizedText('thyroid.specialist.desc')
        },
        {
          icon: "📅",
          title: getLocalizedText('thyroid.postpartum'),
          description: getLocalizedText('thyroid.postpartum.desc')
        }

      ],

      [getLocalizedText('diabetes')]: [

        // { icon: "📊", title: "Blood Sugar Monitoring", description: "How to check and track blood glucose levels" },
        // { icon: "🍎", title: "Diet Management", description: "Meal planning and carb counting for stable blood sugar" },
        // { icon: "💉", title: "Insulin Therapy", description: "Types of insulin and injection techniques during pregnancy" },
        // { icon: "🏃‍♀️", title: "Exercise", description: "Safe physical activity for managing diabetes in pregnancy" },
        // { icon: "⚠️", title: "Complications", description: "Preventing and managing diabetes-related pregnancy complications" },
        // { icon: "👶", title: "Baby's Health", description: "How diabetes affects fetal growth and development" },
        // { icon: "🏥", title: "Medical Team", description: "Working with endocrinologists, nutritionists, and OB providers" },
        // { icon: "📱", title: "Technology", description: "Using glucose monitors and insulin pumps effectively" },
        // { icon: "🍼", title: "Gestational Diabetes", description: "Managing diabetes that develops during pregnancy" },
        // { icon: "📅", title: "Postpartum Care", description: "Diabetes management after delivery and future risk" }

        {
          icon: "📊",
          title: getLocalizedText('diabetes.monitoring'),
          description: getLocalizedText('diabetes.monitoring.desc')
        },
        {
          icon: "🍎",
          title: getLocalizedText('diabetes.diet'),
          description: getLocalizedText('diabetes.diet.desc')
        },
        {
          icon: "💉",
          title: getLocalizedText('diabetes.insulin'),
          description: getLocalizedText('diabetes.insulin.desc')
        },
        {
          icon: "🏃‍♀️",
          title: getLocalizedText('diabetes.exercise'),
          description: getLocalizedText('diabetes.exercise.desc')
        },
        {
          icon: "⚠️",
          title: getLocalizedText('diabetes.complications'),
          description: getLocalizedText('diabetes.complications.desc')
        },
        {
          icon: "👶",
          title: getLocalizedText('diabetes.baby'),
          description: getLocalizedText('diabetes.baby.desc')
        },
        {
          icon: "🏥",
          title: getLocalizedText('diabetes.team'),
          description: getLocalizedText('diabetes.team.desc')
        },
        {
          icon: "📱",
          title: getLocalizedText('diabetes.technology'),
          description: getLocalizedText('diabetes.technology.desc')
        },
        {
          icon: "🍼",
          title: getLocalizedText('diabetes.gestational'),
          description: getLocalizedText('diabetes.gestational.desc')
        },
        {
          icon: "📅",
          title: getLocalizedText('diabetes.postpartum'),
          description: getLocalizedText('diabetes.postpartum.desc')
        }

      ],

      [getLocalizedText("category.fgm")]: [

        // { icon: "🤝", title: "Understanding FGM", description: "Education about female genital mutilation and its effects" },
        // { icon: "🩺", title: "Medical Care", description: "Finding healthcare providers experienced with FGM" },
        // { icon: "🤱", title: "Pregnancy Care", description: "Special considerations during pregnancy and delivery" },
        // { icon: "💪", title: "Physical Healing", description: "Addressing complications and surgical options" },
        // { icon: "🧠", title: "Emotional Support", description: "Trauma-informed counseling and mental health resources" },
        // { icon: "🗣️", title: "Speaking Out", description: "Advocacy and sharing your story safely" },
        // { icon: "👥", title: "Support Groups", description: "Connecting with other survivors and support networks" },
        // { icon: "💖", title: "Intimacy", description: "Addressing sexual health and relationship concerns" },
        // { icon: "👶", title: "Protecting Children", description: "Breaking the cycle and protecting future generations" },
        // { icon: "🌟", title: "Empowerment", description: "Reclaiming your body and finding strength in survival" }

        {
          icon: "🤝",
          title: getLocalizedText('fgm.understanding'),
          description: getLocalizedText('fgm.understanding.desc')
        },
        {
          icon: "🩺",
          title: getLocalizedText('fgm.medical'),
          description: getLocalizedText('fgm.medical.desc')
        },
        {
          icon: "🤱",
          title: getLocalizedText('fgm.pregnancy'),
          description: getLocalizedText('fgm.pregnancy.desc')
        },
        {
          icon: "💪",
          title: getLocalizedText('fgm.healing'),
          description: getLocalizedText('fgm.healing.desc')
        },
        {
          icon: "🧠",
          title: getLocalizedText('fgm.emotional'),
          description: getLocalizedText('fgm.emotional.desc')
        },
        {
          icon: "🗣️",
          title: getLocalizedText('fgm.speaking'),
          description: getLocalizedText('fgm.speaking.desc')
        },
        {
          icon: "👥",
          title: getLocalizedText('fgm.support'),
          description: getLocalizedText('fgm.support.desc')
        },
        {
          icon: "💖",
          title: getLocalizedText('fgm.intimacy'),
          description: getLocalizedText('fgm.intimacy.desc')
        },
        {
          icon: "👶",
          title: getLocalizedText('fgm.protection'),
          description: getLocalizedText('fgm.protection.desc')
        },
        {
          icon: "🌟",
          title: getLocalizedText('fgm.empowerment'),
          description: getLocalizedText('fgm.empowerment.desc')
        }

      ],

      [getLocalizedText("category.hormonal")]: [

        // { icon: "📈", title: "Pregnancy Hormones", description: "Understanding estrogen, progesterone, and hCG changes" },
        // { icon: "🤱", title: "Breastfeeding", description: "How prolactin and oxytocin affect mood and body" },
        // { icon: "🧠", title: "Mood Fluctuations", description: "Hormonal impacts on mental health and emotions" },
        // { icon: "💤", title: "Sleep Patterns", description: "How hormones affect sleep quality and patterns" },
        // { icon: "🍽️", title: "Appetite Changes", description: "Hormonal influences on hunger and food cravings" },
        // { icon: "💧", title: "Body Changes", description: "Skin, hair, and physical changes from hormonal shifts" },
        // { icon: "❤️", title: "Cardiovascular", description: "How hormones affect heart rate and blood pressure" },
        // { icon: "⚖️", title: "Weight Management", description: "Hormonal impacts on metabolism and weight" },
        // { icon: "🩸", title: "Menstrual Cycle", description: "Return of periods and hormonal regulation postpartum" },
        // { icon: "🌟", title: "Balance", description: "Supporting healthy hormone balance naturally" }

        {
          icon: "📈",
          title: getLocalizedText('hormones.pregnancy'),
          description: getLocalizedText('hormones.pregnancy.desc')
        },
        {
          icon: "🤱",
          title: getLocalizedText('hormones.breastfeeding'),
          description: getLocalizedText('hormones.breastfeeding.desc')
        },
        {
          icon: "🧠",
          title: getLocalizedText('hormones.mood'),
          description: getLocalizedText('hormones.mood.desc')
        },
        {
          icon: "💤",
          title: getLocalizedText('hormones.sleep'),
          description: getLocalizedText('hormones.sleep.desc')
        },
        {
          icon: "🍽️",
          title: getLocalizedText('hormones.appetite'),
          description: getLocalizedText('hormones.appetite.desc')
        },
        {
          icon: "💧",
          title: getLocalizedText('hormones.body'),
          description: getLocalizedText('hormones.body.desc')
        },
        {
          icon: "❤️",
          title: getLocalizedText('hormones.cardio'),
          description: getLocalizedText('hormones.cardio.desc')
        },
        {
          icon: "⚖️",
          title: getLocalizedText('hormones.weight'),
          description: getLocalizedText('hormones.weight.desc')
        },
        {
          icon: "🩸",
          title: getLocalizedText('hormones.cycle'),
          description: getLocalizedText('hormones.cycle.desc')
        },
        {
          icon: "🌟",
          title: getLocalizedText('hormones.balance'),
          description: getLocalizedText('hormones.balance.desc')
        }

      ],


      [getLocalizedText("category.preeclampsia")]: [

        // { icon: "🚨", title: "Warning Signs", description: "Recognizing symptoms: headaches, vision changes, swelling" },
        // { icon: "💔", title: "Blood Pressure", description: "Understanding hypertension readings and monitoring" },
        // { icon: "💧", title: "Protein in Urine", description: "What proteinuria means and testing procedures" },
        // { icon: "👶", title: "Fetal Monitoring", description: "How pre-eclampsia affects baby and monitoring needs" },
        // { icon: "🏥", title: "Hospital Care", description: "When hospitalization is needed and what to expect" },
        // { icon: "💊", title: "Medications", description: "Blood pressure medications safe during pregnancy" },
        // { icon: "📅", title: "Delivery Planning", description: "Timing delivery and managing severe pre-eclampsia" },
        // { icon: "⚕️", title: "Prevention", description: "Risk factors and strategies to reduce pre-eclampsia risk" },
        // { icon: "🔄", title: "Recovery", description: "Postpartum monitoring and blood pressure management" },
        // { icon: "📚", title: "Future Pregnancies", description: "Risk in subsequent pregnancies and prevention strategies" }

        {
          icon: "🚨",
          title: getLocalizedText('preeclampsia.warning'),
          description: getLocalizedText('preeclampsia.warning.desc')
        },
        {
          icon: "💔",
          title: getLocalizedText('preeclampsia.bp'),
          description: getLocalizedText('preeclampsia.bp.desc')
        },
        {
          icon: "💧",
          title: getLocalizedText('preeclampsia.protein'),
          description: getLocalizedText('preeclampsia.protein.desc')
        },
        {
          icon: "👶",
          title: getLocalizedText('preeclampsia.fetal'),
          description: getLocalizedText('preeclampsia.fetal.desc')
        },
        {
          icon: "🏥",
          title: getLocalizedText('preeclampsia.hospital'),
          description: getLocalizedText('preeclampsia.hospital.desc')
        },
        {
          icon: "💊",
          title: getLocalizedText('preeclampsia.meds'),
          description: getLocalizedText('preeclampsia.meds.desc')
        },
        {
          icon: "📅",
          title: getLocalizedText('preeclampsia.delivery'),
          description: getLocalizedText('preeclampsia.delivery.desc')
        },
        {
          icon: "⚕️",
          title: getLocalizedText('preeclampsia.prevention'),
          description: getLocalizedText('preeclampsia.prevention.desc')
        },
        {
          icon: "🔄",
          title: getLocalizedText('preeclampsia.recovery'),
          description: getLocalizedText('preeclampsia.recovery.desc')
        },
        {
          icon: "📚",
          title: getLocalizedText('preeclampsia.future'),
          description: getLocalizedText('preeclampsia.future.desc')
        }


      ],

      [getLocalizedText("category.csection")]: [

        // { icon: "🏥", title: "Procedure Overview", description: "What to expect during cesarean delivery surgery" },
        // { icon: "💊", title: "Pain Management", description: "Managing post-surgical pain safely and effectively" },
        // { icon: "🩹", title: "Incision Care", description: "Proper wound care and monitoring for infection" },
        // { icon: "🚶‍♀️", title: "Recovery Timeline", description: "Week-by-week recovery expectations and milestones" },
        // { icon: "🛁", title: "Activity Restrictions", description: "What activities to avoid and when to resume normal activities" },
        // { icon: "⚠️", title: "Warning Signs", description: "Complications to watch for and when to call provider" },
        // { icon: "🤱", title: "Breastfeeding", description: "Positioning and strategies for nursing after C-section" },
        // { icon: "💪", title: "Core Strengthening", description: "Safe exercises to rebuild abdominal strength" },
        // { icon: "🏠", title: "Home Preparation", description: "Setting up your environment for comfortable recovery" },
        // { icon: "👶", title: "Future Deliveries", description: "VBAC options and planning future pregnancies" }

        {
          icon: "🏥",
          title: getLocalizedText('csection.overview'),
          description: getLocalizedText('csection.overview.desc')
        },
        {
          icon: "💊",
          title: getLocalizedText('csection.pain'),
          description: getLocalizedText('csection.pain.desc')
        },
        {
          icon: "🩹",
          title: getLocalizedText('csection.incision'),
          description: getLocalizedText('csection.incision.desc')
        },
        {
          icon: "🚶‍♀️",
          title: getLocalizedText('csection.recovery'),
          description: getLocalizedText('csection.recovery.desc')
        },
        {
          icon: "🛁",
          title: getLocalizedText('csection.activity'),
          description: getLocalizedText('csection.activity.desc')
        },
        {
          icon: "⚠️",
          title: getLocalizedText('csection.warning'),
          description: getLocalizedText('csection.warning.desc')
        },
        {
          icon: "🤱",
          title: getLocalizedText('csection.breastfeeding'),
          description: getLocalizedText('csection.breastfeeding.desc')
        },
        {
          icon: "💪",
          title: getLocalizedText('csection.core'),
          description: getLocalizedText('csection.core.desc')
        },
        {
          icon: "🏠",
          title: getLocalizedText('csection.home'),
          description: getLocalizedText('csection.home.desc')
        },
        {
          icon: "👶",
          title: getLocalizedText('csection.future'),
          description: getLocalizedText('csection.future.desc')
        }

      ],

      [getLocalizedText("category.postpartum.depression")]: [

        // { icon: "😢", title: "Recognizing Symptoms", description: "Identifying signs of postpartum depression vs. baby blues" },
        // { icon: "🧠", title: "Getting Help", description: "When and where to seek professional mental health support" },
        // { icon: "💊", title: "Treatment Options", description: "Therapy, medication, and other treatment approaches" },
        // { icon: "🤱", title: "Breastfeeding", description: "Safe antidepressant options while breastfeeding" },
        // { icon: "👥", title: "Support Systems", description: "Building networks of family, friends, and professional support" },
        // { icon: "💪", title: "Self-Care", description: "Practical self-care strategies during depression" },
        // { icon: "👶", title: "Bonding", description: "Building attachment with baby while managing depression" },
        // { icon: "🎯", title: "Recovery", description: "Setting realistic expectations for healing and improvement" },
        // { icon: "🚨", title: "Crisis Resources", description: "Emergency contacts and crisis intervention resources" },
        // { icon: "🌟", title: "Hope", description: "Understanding that postpartum depression is treatable" }

        {
          icon: "😢",
          title: getLocalizedText('ppd.symptoms'),
          description: getLocalizedText('ppd.symptoms.desc')
        },
        {
          icon: "🧠",
          title: getLocalizedText('ppd.help'),
          description: getLocalizedText('ppd.help.desc')
        },
        {
          icon: "💊",
          title: getLocalizedText('ppd.treatment'),
          description: getLocalizedText('ppd.treatment.desc')
        },
        {
          icon: "🤱",
          title: getLocalizedText('ppd.breastfeeding'),
          description: getLocalizedText('ppd.breastfeeding.desc')
        },
        {
          icon: "👥",
          title: getLocalizedText('ppd.support'),
          description: getLocalizedText('ppd.support.desc')
        },
        {
          icon: "💪",
          title: getLocalizedText('ppd.selfcare'),
          description: getLocalizedText('ppd.selfcare.desc')
        },
        {
          icon: "👶",
          title: getLocalizedText('ppd.bonding'),
          description: getLocalizedText('ppd.bonding.desc')
        },
        {
          icon: "🎯",
          title: getLocalizedText('ppd.recovery'),
          description: getLocalizedText('ppd.recovery.desc')
        },
        {
          icon: "🚨",
          title: getLocalizedText('ppd.crisis'),
          description: getLocalizedText('ppd.crisis.desc')
        },
        {
          icon: "🌟",
          title: getLocalizedText('ppd.hope'),
          description: getLocalizedText('ppd.hope.desc')
        }

      ]
    };

    return contentMap[topicTitle] || [];
  };

  const getSubtopicDetails = (subtopicTitle, mainTopic) => {
    const detailsMap = {

      [getLocalizedText("warning.signs")]: [
        // {
        //   heading: "Emergency Symptoms",

        //   content: [
        //     "• Severe or persistent headaches that don't respond to rest or medication",
        //     "• Vision changes including blurred vision, seeing spots, or light sensitivity",
        //     "• Severe upper abdominal pain, especially under the ribs on the right side",
        //     "• Sudden swelling of face, hands, or feet, particularly if accompanied by other symptoms",
        //     "• Decreased fetal movement after 28 weeks - fewer than 10 movements in 2 hours"
        //   ]
        // },
        // {
        //   heading: "When to Call Your Healthcare Provider",
        //   content: [
        //     "• Any bleeding during pregnancy, regardless of amount",
        //     "• Severe nausea and vomiting that prevents keeping food or fluids down",
        //     "• Signs of infection: fever over 100.4°F, chills, burning during urination",
        //     "• Contractions before 37 weeks that occur regularly every 10 minutes or less",
        //     "• Breaking of waters (fluid leaking from vagina) at any stage of pregnancy"
        //   ],
        //   islamicNote: "Islam teaches us to seek medical care when needed. The Prophet (PBUH) said: 'Allah has not created a disease without creating a cure for it.' Taking care of your health and your baby's health is a religious obligation."
        // }

        {
          heading: getLocalizedText('warning.emergency'),
          content: [
            `• ${getLocalizedText('warning.headache')}`,
            `• ${getLocalizedText('warning.vision')}`,
            `• ${getLocalizedText('warning.abdomen')}`,
            `• ${getLocalizedText('warning.swelling')}`,
            `• ${getLocalizedText('warning.movement')}`
          ]
        },
        {
          heading: getLocalizedText('warning.call'),
          content: [
            `• ${getLocalizedText('warning.bleeding')}`,
            `• ${getLocalizedText('warning.vomiting')}`,
            `• ${getLocalizedText('warning.infection')}`,
            `• ${getLocalizedText('warning.contractions')}`,
            `• ${getLocalizedText('warning.waters')}`
          ],
          islamicNote: getLocalizedText('warning.islam')
        }

      ],

      [getLocalizedText("bleeding.title")]: [
        // {
        //   heading: "Types of Pregnancy Bleeding",
        //   content: [
        //     "• Implantation bleeding: Light spotting around 6-12 days after conception, usually brown or pink",
        //     "• First trimester bleeding: Can indicate miscarriage risk, ectopic pregnancy, or cervical changes",
        //     "• Second trimester bleeding: May signal placental problems, cervical insufficiency, or preterm labor",
        //     "• Third trimester bleeding: Often related to placental abruption or placenta previa"
        //   ]
        // },
        // {
        //   heading: "What to Do",
        //   content: [
        //     "• Contact your healthcare provider immediately for any bleeding",
        //     "• Note the color (bright red, brown, pink), amount, and any associated symptoms",
        //     "• Avoid tampons, douching, or sexual intercourse until cleared by your doctor",
        //     "• Rest and avoid strenuous activities as advised by your healthcare team"
        //   ],
        //   islamicNote: "During times of bleeding or pregnancy complications, Islamic law provides accommodations for prayer and other religious obligations. Consult with a knowledgeable Islamic scholar about your specific situation."
        // }

        {
          heading: getLocalizedText('bleeding.types'),
          content: [
            `• ${getLocalizedText('bleeding.implantation')}`,
            `• ${getLocalizedText('bleeding.first')}`,
            `• ${getLocalizedText('bleeding.second')}`,
            `• ${getLocalizedText('bleeding.third')}`
          ]
        },
        {
          heading: getLocalizedText('bleeding.actions'),
          content: [
            `• ${getLocalizedText('bleeding.contact')}`,
            `• ${getLocalizedText('bleeding.note')}`,
            `• ${getLocalizedText('bleeding.avoid')}`,
            `• ${getLocalizedText('bleeding.rest')}`
          ],
          islamicNote: getLocalizedText('bleeding.islam')
        }
      ],

      [getLocalizedText("morning_sickness.title")]: [
        {
          heading: getLocalizedText('morning_sickness.understanding'),
          content: [
            `• ${getLocalizedText('morning_sickness.point1')}`,
            `• ${getLocalizedText('morning_sickness.point2')}`,
            `• ${getLocalizedText('morning_sickness.point3')}`,
            `• ${getLocalizedText('morning_sickness.point4')}`
          ]
        },
        {
          heading: getLocalizedText('morning_sickness.management'),
          content: [
            `• ${getLocalizedText('morning_sickness.point5')}`,
            `• ${getLocalizedText('morning_sickness.point6')}`,
            `• ${getLocalizedText('morning_sickness.point7')}`,
            `• ${getLocalizedText('morning_sickness.point8')}`,
            `• ${getLocalizedText('morning_sickness.point9')}`
          ],
          islamicNote: getLocalizedText('morning_sickness.islamic')
        }
      ],

      [getLocalizedText("time.title")]: [
        // {
        //   heading: "Effective Scheduling Strategies",
        //   content: [
        //     "• Use time-blocking to dedicate specific hours for work tasks and family activities",
        //     "• Prepare meals and organize clothes the night before to streamline mornings",
        //     "• Implement the 'two-minute rule': if a task takes less than two minutes, do it immediately",
        //     "• Batch similar activities together (meal prep, errands, emails) for efficiency"
        //   ]
        // },
        // {
        //   heading: "Setting Boundaries",
        //   content: [
        //     "• Establish clear work hours and communicate them to colleagues and family",
        //     "• Learn to say no to non-essential commitments that drain your energy",
        //     "• Delegate household tasks to family members or consider hiring help when possible",
        //     "• Use technology wisely: set phone boundaries and limit social media during family time"
        //   ],
        //   islamicNote: "Islam emphasizes balance in all aspects of life. The Quran states: 'And We made from them leaders guiding by Our command when they were patient and were certain of Our signs.' Patience and proper time management are virtues that help us fulfill our roles as mothers and professionals."
        // }

        {
          heading: getLocalizedText('time.strategies'),
          content: [
            `• ${getLocalizedText('time.point1')}`,
            `• ${getLocalizedText('time.point2')}`,
            `• ${getLocalizedText('time.point3')}`,
            `• ${getLocalizedText('time.point4')}`
          ]
        },
        {
          heading: getLocalizedText('time.boundaries'),
          content: [
            `• ${getLocalizedText('time.point5')}`,
            `• ${getLocalizedText('time.point6')}`,
            `• ${getLocalizedText('time.point7')}`,
            `• ${getLocalizedText('time.point8')}`
          ],
          islamicNote: getLocalizedText('time.islamic')
        }
      ],

      [getLocalizedText("bf.title")]: [
        // {
        //   heading: "Legal Rights and Workplace Accommodation",
        //   content: [
        //     "• Under the PUMP Act, most employers must provide reasonable break time for pumping",
        //     "• You're entitled to a private space (not a bathroom) for expressing milk",
        //     "• Discuss your needs with HR before returning to work to establish a pumping schedule",
        //     "• Know your state laws, as some provide additional protections beyond federal requirements"
        //   ]
        // },
        // {
        //   heading: "Practical Pumping Tips",
        //   content: [
        //     "• Pump every 2-3 hours during work hours to maintain milk supply",
        //     "• Invest in a high-quality double electric pump for efficiency",
        //     "• Store milk properly: fresh milk can stay at room temperature for 4 hours, refrigerated for 4 days",
        //     "• Keep extra pump parts at work in case of forgotten pieces or malfunctions",
        //     "• Consider power pumping sessions in the evening to boost supply if needed"
        //   ],
        //   islamicNote: "Breastfeeding is highly recommended in Islam, with the Quran mentioning nursing for two full years if desired. Seeking workplace accommodations to continue this blessed act is supported by Islamic principles of caring for children."
        // }

        {
          heading: getLocalizedText('pumping.legal'),
          content: [
            `• ${getLocalizedText('pumping.point1')}`,
            `• ${getLocalizedText('pumping.point2')}`,
            `• ${getLocalizedText('pumping.point3')}`,
            `• ${getLocalizedText('pumping.point4')}`
          ]
        },
        {
          heading: getLocalizedText('pumping.tips'),
          content: [
            `• ${getLocalizedText('pumping.point5')}`,
            `• ${getLocalizedText('pumping.point6')}`,
            `• ${getLocalizedText('pumping.point7')}`,
            `• ${getLocalizedText('pumping.point8')}`,
            `• ${getLocalizedText('pumping.point9')}`
          ],
          islamicNote: getLocalizedText('pumping.islamic')
        }

      ],

      [getLocalizedText("ppd.title")]: [
        // {
        //   heading: "Understanding the Difference",
        //   content: [
        //     "• Baby blues affect 80% of new mothers: mood swings, crying, anxiety that resolves within 2 weeks",
        //     "• Postpartum depression affects 10-20% of mothers: persistent sadness, hopelessness, difficulty bonding",
        //     "• Symptoms include: loss of interest in activities, changes in appetite, sleep problems, feelings of worthlessness",
        //     "• Can occur anytime within the first year after childbirth, not just immediately after delivery"
        //   ]
        // },
        // {
        //   heading: "Treatment and Support",
        //   content: [
        //     "• Professional counseling, including cognitive-behavioral therapy and interpersonal therapy",
        //     "• Medication options that are safe during breastfeeding, if appropriate",
        //     "• Support groups connecting you with other mothers experiencing similar challenges",
        //     "• Lifestyle changes: regular exercise, adequate sleep, nutritious diet, and stress reduction",
        //     "• Don't hesitate to ask for help with baby care and household tasks"
        //   ],
        //   islamicNote: "Mental health is as important as physical health in Islam. Seeking treatment for depression is not a sign of weak faith but rather taking care of the trust (amanah) Allah has given you. The Prophet (PBUH) emphasized the importance of caring for one's health."
        // }

        {
          heading: getLocalizedText('ppd.understanding'),
          content: [
            `• ${getLocalizedText('ppd.point1')}`,
            `• ${getLocalizedText('ppd.point2')}`,
            `• ${getLocalizedText('ppd.point3')}`,
            `• ${getLocalizedText('ppd.point4')}`
          ]
        },
        {
          heading: getLocalizedText('ppd.treatments'),
          content: [
            `• ${getLocalizedText('ppd.point5')}`,
            `• ${getLocalizedText('ppd.point6')}`,
            `• ${getLocalizedText('ppd.point7')}`,
            `• ${getLocalizedText('ppd.point8')}`,
            `• ${getLocalizedText('ppd.point9')}`
          ],
          islamicNote: getLocalizedText('ppd.islamic')
        }
      ],

      [getLocalizedText("anxiety.title")]: [
        {
          //   heading: "Common Pregnancy and Parenting Anxieties",
          //   content: [
          //     "• Fear about baby's health and development during pregnancy and after birth",
          //     "• Worries about being a good parent and making the right decisions",
          //     "• Concerns about finances, career changes, and family dynamics",
          //     "• Anxiety about childbirth, pain management, and medical procedures"
          //   ]
          // },
          // {
          //   heading: "Coping Strategies",
          //   content: [
          //     "• Practice deep breathing exercises and progressive muscle relaxation",
          //     "• Limit exposure to negative birth stories and excessive pregnancy information",
          //     "• Maintain regular exercise appropriate for your pregnancy stage",
          //     "• Journal your thoughts and feelings to identify anxiety triggers",
          //     "• Build a strong support network of family, friends, and healthcare providers"
          //   ],
          heading: getLocalizedText('anxiety.subtitle'),
          content: [
            `• ${getLocalizedText('anxiety.point1')}`,
            `• ${getLocalizedText('anxiety.point2')}`,
            `• ${getLocalizedText('anxiety.point3')}`,
            `• ${getLocalizedText('anxiety.point4')}`
          ]
        },
        {
          heading: getLocalizedText('anxiety.coping'),
          content: [
            `• ${getLocalizedText('anxiety.point5')}`,
            `• ${getLocalizedText('anxiety.point6')}`,
            `• ${getLocalizedText('anxiety.point7')}`,
            `• ${getLocalizedText('anxiety.point8')}`,
            `• ${getLocalizedText('anxiety.point9')}`
          ],
          islamicNote: getLocalizedText('intimacy.quote')
        }
      ],
      [getLocalizedText('intimacy.title')]: [
        {
          heading: getLocalizedText('intimacy.safety'),
          content: [
            `• ${getLocalizedText('intimacy.safe1')}`,
            `• ${getLocalizedText('intimacy.safe2')}`,
            `• ${getLocalizedText('intimacy.safe3')}`,
            `• ${getLocalizedText('intimacy.safe4')}`
          ]
        },
        {
          heading: getLocalizedText('intimacy.avoid_title'),
          content: [
            `• ${getLocalizedText('intimacy.avoid1')}`,
            `• ${getLocalizedText('intimacy.avoid2')}`,
            `• ${getLocalizedText('intimacy.avoid3')}`,
            `• ${getLocalizedText('intimacy.avoid4')}`,
            `• ${getLocalizedText('intimacy.avoid5')}`
          ],
          islamicNote: getLocalizedText('intimacy.islamic')
        }
      ],
      [getLocalizedText("postpartum.title")]: [
        {
          heading: getLocalizedText('postpartum.timeline'),
          content: [
            `• ${getLocalizedText('postpartum.point1')}`,
            `• ${getLocalizedText('postpartum.point2')}`,
            `• ${getLocalizedText('postpartum.point3')}`,
            `• ${getLocalizedText('postpartum.point4')}`
          ]
        },
        {
          heading: getLocalizedText('postpartum.readiness'),
          content: [
            `• ${getLocalizedText('postpartum.ready1')}`,
            `• ${getLocalizedText('postpartum.ready2')}`,
            `• ${getLocalizedText('postpartum.ready3')}`,
            `• ${getLocalizedText('postpartum.ready4')}`,
            `• ${getLocalizedText('postpartum.ready5')}`
          ],
          islamicNote: getLocalizedText('postpartum.islamic')
        }
      ],

      [getLocalizedText("thyroid.title")]: [
        // {
        //   heading: "Thyroid Changes During Pregnancy",
        //   content: [
        //     "• Thyroid hormone needs increase by 30-50% during pregnancy",
        //     "• Human chorionic gonadotropin (hCG) can stimulate thyroid activity in early pregnancy",
        //     "• Changes in thyroid-binding proteins affect hormone levels",
        //     "• Pre-existing thyroid conditions require close monitoring and medication adjustments"
        //   ]
        // },
        // {
        //   heading: "Monitoring and Management",
        //   content: [
        //     "• Regular blood tests to check TSH, T3, and T4 levels throughout pregnancy",
        //     "• Medication adjustments based on trimester-specific reference ranges",
        //     "• Coordination between endocrinologist and obstetrician for optimal care",
        //     "• Postpartum monitoring as thyroid needs change again after delivery"
        //   ],
        //   islamicNote: "Taking prescribed thyroid medication during pregnancy is essential for both mother and baby's health. Islam supports seeking medical treatment and following healthcare guidance to protect the lives entrusted to our care."
        // }

        {
          heading: getLocalizedText('thyroid.changes'),
          content: [
            `• ${getLocalizedText('thyroid.point1')}`,
            `• ${getLocalizedText('thyroid.point2')}`,
            `• ${getLocalizedText('thyroid.point3')}`,
            `• ${getLocalizedText('thyroid.point4')}`
          ]
        },
        {
          heading: getLocalizedText('thyroid.monitoring'),
          content: [
            `• ${getLocalizedText('thyroid.manage1')}`,
            `• ${getLocalizedText('thyroid.manage2')}`,
            `• ${getLocalizedText('thyroid.manage3')}`,
            `• ${getLocalizedText('thyroid.manage4')}`
          ],
          islamicNote: getLocalizedText('thyroid.islamic')
        }
      ]
    };

    return detailsMap[subtopicTitle] || [
      {
        heading: getLocalizedText('info.title'),
        content: [
          `• ${getLocalizedText('info.detail')}`,
          `• ${getLocalizedText('info.importance')}`
        ],
        islamicNote: getLocalizedText('info.islamic')
      }
    ];
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'safe':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'caution':
        return <Info className="w-4 h-4 text-yellow-500" />;
      case 'attention':
        return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case 'urgent':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <Info className="w-4 h-4 text-gray-500" />;
    }
  };

  const ColorChart = ({ types, expandedType, setExpandedType, title }: {
    types: any[],
    expandedType: string | null,
    setExpandedType: (id: string | null) => void,
    title: string
  }) => (



    <Card className="relative overflow-hidden mb-6">
      <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white border border-lavender-200'}`}></div>

      <CardHeader className="relative z-10">
        <CardTitle className={`flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-lavender-600'}`}>
          <Droplets className="w-5 h-5" />
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {types.map((type) => (
            <Card
              key={type.id}
              className={`relative overflow-hidden cursor-pointer hover:shadow-md transition-all duration-300 ${settings.darkMode ? 'bg-slate-800 border border-slate-600' : type.color}`}
              onClick={() => setExpandedType(expandedType === type.id ? null : type.id)}
            >
              <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-800' : 'bg-transparent'}`}></div>

              <CardContent className="p-3 text-center relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl">{type.icon}</span>
                  {getStatusIcon(type.status)}
                </div>
                <h4 className={`font-semibold text-xs ${settings.darkMode ? 'text-gray-200' : type.textColor} mb-1`}>
                  {type.title}
                </h4>
                <p className={`text-xs ${settings.darkMode ? 'text-gray-400' : `${type.textColor} opacity-75`}`}>
                  {type.brief}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {expandedType && (
          <Card className="relative overflow-hidden mt-4">
            <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-800 border border-slate-600' : 'bg-lavender-50 border-lavender-200'}`}></div>

            <CardContent className="p-4 relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{types.find(t => t.id === expandedType)?.icon}</span>
                <h4 className={`font-semibold ${settings.darkMode ? 'text-white' : 'text-lavender-800'}`}>
                  {types.find(t => t.id === expandedType)?.title}
                </h4>
                {getStatusIcon(types.find(t => t.id === expandedType)?.status)}
              </div>
              <p className={`${settings.darkMode ? 'text-gray-300' : 'text-lavender-700'} text-sm leading-relaxed`}>
                {types.find(t => t.id === expandedType)?.detailed}
              </p>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>


  );

  const TopicChart = ({ topics, expandedTopic, setExpandedTopic, title, titleIcon }: {
    topics: any[],
    expandedTopic: string | null,
    setExpandedTopic: (id: string | null) => void,
    title: string,
    titleIcon: React.ReactNode
  }) => (


    <Card className="relative overflow-hidden mb-6">
      <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white border border-lavender-200'}`}></div>

      <CardHeader className="relative z-10">
        <CardTitle className={`flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-lavender-600'}`}>
          {titleIcon}
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          {topics.map((topic) => (
            <Card
              key={topic.id}
              className={`relative overflow-hidden cursor-pointer hover:shadow-md transition-all duration-300 ${settings.darkMode ? 'bg-slate-800 border border-slate-600' : 'border-lavender-200 hover:bg-lavender-50'}`}
              onClick={() => setExpandedTopic(expandedTopic === topic.id ? null : topic.id)}
            >
              <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-800' : 'bg-transparent'}`}></div>

              <CardContent className="p-4 relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{topic.icon}</span>
                    <h4 className={`font-semibold text-sm ${settings.darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      {topic.title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(topic.status)}
                    {expandedTopic === topic.id ? (
                      <ChevronUp className={`w-4 h-4 ${settings.darkMode ? 'text-gray-200' : 'text-lavender-600'}`} />
                    ) : (
                      <ChevronDown className={`w-4 h-4 ${settings.darkMode ? 'text-gray-200' : 'text-lavender-600'}`} />
                    )}
                  </div>
                </div>
                <p className={`text-xs ${settings.darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                  {topic.brief}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {expandedTopic && (
          <Card className="relative overflow-hidden mt-4">
            <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-800 border border-slate-600' : 'bg-lavender-50 border-lavender-200'}`}></div>

            <CardContent className="p-4 relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{topics.find(t => t.id === expandedTopic)?.icon}</span>
                <h4 className={`font-semibold ${settings.darkMode ? 'text-white' : 'text-lavender-800'}`}>
                  {topics.find(t => t.id === expandedTopic)?.title}
                </h4>
                {getStatusIcon(topics.find(t => t.id === expandedTopic)?.status)}
              </div>
              <p className={`${settings.darkMode ? 'text-gray-300' : 'text-lavender-700'} text-sm leading-relaxed`}>
                {topics.find(t => t.id === expandedTopic)?.detailed}
              </p>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>

  );



  const educationalGuides = [
    {
      title: getLocalizedText('vaginal.discharge.guide'),
      description: getLocalizedText('vaginal.discharge.guide.description'),
      icons: ["⚪", "🟡", "🧀", "💧"],
      coverage: getLocalizedText('vaginal.discharge.guide.coverage'),
      color: "from-blue-500 to-blue-600",
      component: <ColorChart
        types={dischargeTypes}
        expandedType={expandedDischarge}
        setExpandedType={setExpandedDischarge}
        title={getLocalizedText('vaginal.discharge.color.chart')}
      />
    },
    {
      title: getLocalizedText('period.blood.color.guide'),
      description: getLocalizedText('period.blood.color.guide.description'),
      icons: ["🔴", "🟤", "🟫", "🌸"],
      coverage: getLocalizedText('period.blood.color.guide.coverage'),
      color: "from-red-500 to-red-600",
      component: <ColorChart
        types={bloodTypes}
        expandedType={expandedBlood}
        setExpandedType={setExpandedBlood}
        title={getLocalizedText('period.blood.color.chart')}
      />
    },
    {
      title: getLocalizedText('early.signs.of.pregnancy'),
      description: getLocalizedText('early.signs.of.pregnancy.description'),
      icons: ["🤰", "🧪", "💭", "💕"],
      coverage: getLocalizedText('early.signs.of.pregnancy.coverage'),
      color: "from-pink-500 to-pink-600",
      component: <TopicChart
        topics={pregnancySigns}
        expandedTopic={expandedPregnancy}
        setExpandedTopic={setExpandedPregnancy}
        title={getLocalizedText('early.pregnancy.signs')}
        titleIcon={<Baby className="w-5 h-5 text-lavender-600" />}
      />
    }
  ];



  const healthConditions = [
    {
      title: getLocalizedText('pcos.support.awareness'),
      description: getLocalizedText('pcos.support.awareness.description'),
      icons: ["🌀", "💪", "🌱", "🤲"],
      coverage: getLocalizedText('pcos.support.awareness.coverage'),
      color: "from-purple-500 to-purple-600",
      component: <TopicChart
        topics={pcosTopics}
        expandedTopic={expandedPCOS}
        setExpandedTopic={setExpandedPCOS}
        title={getLocalizedText('pcos.support.management')}
        titleIcon={<Flower className="w-5 h-5 text-lavender-600" />}
      />
    },
    {
      title: getLocalizedText('endometriosis.support'),
      description: getLocalizedText('endometriosis.support.description'),
      icons: ["🌙", "💙", "🛡️", "🤲"],
      coverage: getLocalizedText('endometriosis.support.coverage'),
      color: "from-indigo-500 to-indigo-600",
      component: <TopicChart
        topics={endometriosisTopics}
        expandedTopic={expandedEndometriosis}
        setExpandedTopic={setExpandedEndometriosis}
        title={getLocalizedText('endometriosis.support')}
        titleIcon={<Shield className="w-5 h-5 text-lavender-600" />}
      />
    }
  ];


  const periodManagement = [
    {
      title: getLocalizedText('what.makes.cramps.worse'),
      description: getLocalizedText('what.makes.cramps.worse.description'),
      icons: ["☕", "😰", "🍰", "💧"],
      coverage: getLocalizedText('what.makes.cramps.worse.coverage'),
      color: "from-orange-500 to-orange-600",
      component: <TopicChart
        topics={crampTriggers}
        expandedTopic={expandedCrampTriggers}
        setExpandedTopic={setExpandedCrampTriggers}
        title={getLocalizedText('cramp.triggers.to.avoid')}
        titleIcon={<AlertCircle className="w-5 h-5 text-lavender-600" />}
      />
    },
    {
      title: getLocalizedText('why.periods.are.late'),
      description: getLocalizedText('why.periods.are.late.description'),
      icons: ["⏰", "😰", "⚖️", "🩺"],
      coverage: getLocalizedText('why.periods.are.late.coverage'),
      color: "from-yellow-500 to-yellow-600",
      component: <TopicChart
        topics={latePeriodsReasons}
        expandedTopic={expandedLatePeriods}
        setExpandedTopic={setExpandedLatePeriods}
        title={getLocalizedText('common.causes.of.late.periods')}
        titleIcon={<Clock className="w-5 h-5 text-lavender-600" />}
      />
    },
    {
      title: getLocalizedText('period.length.changes'),
      description: getLocalizedText('period.length.changes.description'),
      icons: ["📅", "⬆️", "⬇️", "🩺"],
      coverage: getLocalizedText('period.length.changes.coverage'),
      color: "from-green-500 to-green-600",
      component: <TopicChart
        topics={periodLengthFactors}
        expandedTopic={expandedPeriodLength}
        setExpandedTopic={setExpandedPeriodLength}
        title={getLocalizedText('understanding.period.length.changes')}
        titleIcon={<Calendar className="w-5 h-5 text-lavender-600" />}
      />
    }
  ];


  const familyPlanning = [
    {
      title: getLocalizedText('pregnancy.health.topics'),
      description: getLocalizedText('pregnancy.health.topics.description'),
      icons: ["🤰", "🧠", "👩🏽‍💼", "🏥"],
      coverage: getLocalizedText('pregnancy.health.topics.coverage'),
      color: "from-rose-500 to-rose-600",
      component: <TopicChart
        topics={pregnancyHealthTopics}
        expandedTopic={expandedPregnancy}
        setExpandedTopic={setExpandedPregnancy}
        title={getLocalizedText('common.causes.of.late.periods')}
        titleIcon={<Heart className="w-5 h-5 text-lavender-600" />}
      />
    },
    {
      title: getLocalizedText('contraception.family.planning'),
      description: getLocalizedText('contraception.family.planning.description'),
      icons: ["🛡️", "💊", "🌙", "👥"],
      coverage: getLocalizedText('contraception.family.planning.coverage'),
      color: "from-teal-500 to-teal-600",
      component: <TopicChart
        topics={contraceptionTopics}
        expandedTopic={expandedContraception}
        setExpandedTopic={setExpandedContraception}
        title={getLocalizedText('family.planning.contraception')}
        titleIcon={<Target className="w-5 h-5 text-lavender-600" />}
      />
    },
    {
      title: getLocalizedText('natural.cramp.remedies'),
      description: getLocalizedText('natural.cramp.remedies.description'),
      icons: ["🔥", "🌿", "🍯"],
      coverage: getLocalizedText('natural.cramp.remedies.coverage'),
      color: "from-emerald-500 to-emerald-600",
      component: <TopicChart
        topics={naturalRemedies}
        expandedTopic={expandedRemedies}
        setExpandedTopic={setExpandedRemedies}
        title={getLocalizedText('natural.pain.relief.methods')}
        titleIcon={<Leaf className="w-5 h-5 text-lavender-600" />}
      />
    }
  ];

  const toggleSection = (sectionKey: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const GuideCard = ({ guide, sectionKey }: { guide: any; sectionKey: string }) => {
    const isOpen = openSections[sectionKey] || false;


    return (


      <Collapsible open={isOpen} onOpenChange={() => toggleSection(sectionKey)}>
        <Card className="relative overflow-hidden card-3d">
          <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-gradient-to-br from-white to-purple-50 border border-gray-200'}`}></div>

          <CollapsibleTrigger asChild>
            <CardContent className="p-4 relative z-10 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${guide.color} flex items-center justify-center text-white text-xs font-bold circular-3d`}>
                  {guide.icons[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-semibold mb-1 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>{guide.title}</h3>
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                  <div className="flex gap-1 mb-2">
                    {guide.icons.map((icon, index) => (
                      <span key={index} className="text-sm">{icon}</span>
                    ))}
                    <span className={`text-xs font-medium ml-1 ${settings.darkMode ? 'text-lavender-400' : 'text-lavender-600'}`}>{guide.coverage}</span>
                  </div>
                </div>
              </div>
              <p className={`text-sm leading-relaxed mb-3 ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{guide.description}</p>
            </CardContent>
          </CollapsibleTrigger>

          <CollapsibleContent>
            {guide.component && (
              <div className="px-4 pb-4">
                {guide.component}
              </div>
            )}
          </CollapsibleContent>
        </Card>
      </Collapsible>
    );
  };

  return (

    <div className="space-y-6">

      <div className={`text-center ${settings.darkMode ? 'text-white' : ''}`}>
        <h1 className={`text-3xl font-bold mb-2 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>
          {getLocalizedText('health.insights')}
        </h1>
        <p className={`${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {getLocalizedText('comprehensive.health.guidance')}
        </p>
      </div>

      {/* Health Scores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="relative overflow-hidden card-3d">
          <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white border border-gray-200'}`}></div>
          <CardContent className="p-4 relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className={`font-semibold ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>{getLocalizedText('cycle.regularity')}</h3>
                <p className={`text-sm ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{getLocalizedText('your.cycles.are.very.regular')}</p>
              </div>
              <div className="text-right">
                <span className={`text-2xl font-bold ${settings.darkMode ? 'text-lavender-400' : 'text-lavender-600'}`}>92%</span>
              </div>
            </div>
            <Progress value={92} className="h-2" />
          </CardContent>
        </Card>





        <Card className="relative overflow-hidden"

        >
          <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white border border-gray-200'}`}></div>
          <CardContent className="p-4 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`font-semibold ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>{getLocalizedText('overall.health.score')}</h3>
                <p className={`text-sm ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{getLocalizedText('based.on.tracking.patterns')}</p>
              </div>
              <div className="text-right">
                <span className={`text-lg font-bold ${settings.darkMode ? 'text-green-400' : 'text-green-600'}`}>{getLocalizedText('excellent')}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">

        <Card className="relative overflow-hidden card-3d cursor-pointer"
          onClick={handleOpenInsightVideoOne}
          ref={triggerRef}
        >
          <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white border border-gray-200'}`}></div>
          <CardContent className="p-4 relative ">
            <picture>
              <img
                src="/lovable-uploads/InsightOne.jpeg"
                alt="InsightImage"
                className="w-full h-60 object-contain"

              />
            </picture>

          </CardContent>
        </Card>

        <Card className="relative overflow-hidden card-3d cursor-pointer">
          <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white border border-gray-200'}`}></div>
          <CardContent className="p-4 relative"
            onClick={handleOpenInsightVideoTwo}
            ref={triggerRefTwo}
          >
            <picture>
              <img
                src="/lovable-uploads/InsightTwo.jpeg"
                alt="InsightImage"
                className="w-full h-60 object-contain"

              />
            </picture>

          </CardContent>
        </Card>



      </div>

      {openInsightVideoOne && (

        <Dialog open={openInsightVideoOne} onOpenChange={setOpenInsightVideoOne}>

          <DialogContent
            className={`sm:max-w-md p-6 rounded-xl sm:rounded-xl md:rounded-xl ${settings.darkMode ? 'bg-slate-900 text-white' : 'bg-white'}  mt-[-160em] md:mt-[-140em]`}
          >
            <DialogHeader>
              <DialogTitle className={`flex items-center justify-center ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 pt-4">

              <video
                src="/lovable-uploads/InsightVideoOne.mp4"
                controls
                autoPlay
                controlsList="nodownload"
                onContextMenu={(e) => e.preventDefault()}
                className="w-full h-auto object-contain"
              />



              <div className="flex space-x-2 pt-4">

                <Button
                  variant="outline"
                  onClick={() => setOpenInsightVideoOne(false)}
                  className="flex-1"
                >
                  {getLocalizedText('close')}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )
      }


      {openInsightVideoTwo && (

        <Dialog open={openInsightVideoTwo} onOpenChange={setOpenInsightVideoTwo}>

          <DialogContent
            className={`sm:max-w-md p-6 rounded-xl sm:rounded-xl md:rounded-xl ${settings.darkMode ? 'bg-slate-900 text-white' : 'bg-white'}  mt-[-160em] md:mt-[-140em]`}
          >
            <DialogHeader>
              <DialogTitle className={`flex items-center justify-center ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 pt-4">

              <video
                src="/lovable-uploads/InsightVideoTwo.mp4"
                controls
                autoPlay
                controlsList="nodownload"
                onContextMenu={(e) => e.preventDefault()}
                className="w-full h-auto object-contain"
              />



              <div className="flex space-x-2 pt-4">

                <Button
                  variant="outline"
                  onClick={() => setOpenInsightVideoTwo(false)}
                  className="flex-1"
                >
                  {getLocalizedText('close')}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )
      }



      {/* Educational Health Guides */}

      <h2 className={`text-xl font-bold mb-4 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>{getLocalizedText('educational.health.guides')}</h2>
      <div className="grid grid-cols-1 gap-4">
        {educationalGuides.map((guide, index) => (
          <GuideCard key={index} guide={guide} sectionKey={`educational-${index}`} />
        ))}
      </div>


      {/* Pregnancy & Women's Health Topics Grid */}
      <div>
        {selectedSubtopic ? (
          <div>
            <div className="flex items-center mb-6">
              <Button
                variant="ghost"
                onClick={() => setSelectedSubtopic(null)}
                className={`mr-4 ${settings.darkMode ? 'text-white hover:bg-slate-700' : 'text-gray-800 hover:bg-gray-100'}`}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {getLocalizedText('back')}
              </Button>
              <h2 className={`text-xl font-bold ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>
                {selectedSubtopic.title}
              </h2>
            </div>

            <Card className="relative overflow-hidden card-3d">
              {/* Background Layer */}
              <div className={`absolute inset-0 ${settings.darkMode
                ? 'bg-slate-900 border border-slate-600'
                : 'bg-white border border-gray-200'}`}></div>

              <CardContent className="p-6 relative z-10">
                <div className="space-y-6">
                  {getSubtopicDetails(selectedSubtopic.title, selectedTopic.title).map((section, index) => (
                    <div key={index}>
                      <h3 className={`text-lg font-semibold mb-3 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {section.heading}
                      </h3>

                      <div className="space-y-2">
                        {section.content.map((item, itemIndex) => (
                          <p key={itemIndex} className={`text-sm leading-relaxed ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {item}
                          </p>
                        ))}
                      </div>

                      {section.islamicNote && (
                        <div className={`mt-4 p-4 rounded-lg ${settings.darkMode
                          ? 'bg-slate-700 border border-slate-600'
                          : 'bg-purple-50 border border-purple-200'}`}>
                          <h4 className={`text-sm font-semibold mb-2 ${settings.darkMode ? 'text-purple-300' : 'text-purple-700'}`}>
                            🕌 {getLocalizedText('islamic_perspective')}
                          </h4>
                          <p className={`text-sm ${settings.darkMode ? 'text-purple-200' : 'text-purple-600'}`}>
                            {section.islamicNote}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>


          </div>
        ) : selectedTopic ? (
          <div>
            <div className="flex items-center mb-6">
              <Button
                variant="ghost"
                onClick={() => setSelectedTopic(null)}
                className={`mr-4 ${settings.darkMode ? 'text-white hover:bg-slate-700' : 'text-gray-800 hover:bg-gray-100'}`}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {getLocalizedText('back_to_topics')}
              </Button>
              <h2 className={`text-xl font-bold ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>
                {selectedTopic.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getTopicContent(selectedTopic.title).map((item, index) => (

                <Card
                  key={index}
                  className="relative overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
                  onClick={() => setSelectedSubtopic(item)}
                >
                  {/* Background Layer */}
                  <div className={`absolute inset-0 ${settings.darkMode
                    ? 'bg-slate-900 border border-slate-700'
                    : 'bg-white border border-gray-200'}`}></div>

                  {/* Foreground Content */}
                  <CardContent className="p-4 relative z-10">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${selectedTopic.color} flex items-center justify-center text-white text-sm mb-3`}>
                      {item.icon}
                    </div>
                    <h3 className={`font-semibold text-sm ${settings.darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>
                      {item.title}
                    </h3>
                    <p className={`text-xs ${settings.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {item.description}
                    </p>
                  </CardContent>
                </Card>

              ))}
            </div>
          </div>
        ) : (
          <>
            <h2 className={`text-xl font-bold mb-4  ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>
              {getLocalizedText('pregnancy_women_health')}
            </h2>

            <Carousel className="w-full">
              <div className="flex items-center justify-between mb-4">
                <div></div>
                <div className="flex items-center space-x-2">
                  <CarouselPrevious className="relative !top-0 !transform-none !border !border-gray-300 hover:bg-gray-50" />
                  <CarouselNext className="relative !top-0 !transform-none !border !border-gray-300 hover:bg-gray-50" />
                </div>
              </div>
              <CarouselContent className={`m-2 mb-5`}>
                {

                  [

                    {
                      title: getLocalizedText('category.pregnancy.complications'),
                      icon: "⚠️",
                      description: getLocalizedText('desc.pregnancy.complications'),
                      color: "from-red-500 to-red-600"
                    },
                    {
                      title: getLocalizedText('category.pregnancy.loss'),
                      icon: "💜",
                      description: getLocalizedText('desc.pregnancy.loss'),
                      color: "from-purple-500 to-purple-600"
                    },
                    {
                      title: getLocalizedText('category.working.moms'),
                      icon: "👩🏽‍💼",
                      description: getLocalizedText('desc.working.moms'),
                      color: "from-blue-500 to-blue-600"
                    },
                    {
                      title: getLocalizedText('category.sleep.eating'),
                      icon: "🍎",
                      description: getLocalizedText('desc.sleep.eating'),
                      color: "from-green-500 to-green-600"
                    },
                    {
                      title: getLocalizedText('category.mental.health'),
                      icon: "🧠",
                      description: getLocalizedText('desc.mental.health'),
                      color: "from-indigo-500 to-indigo-600"
                    },
                    {
                      title: getLocalizedText('category.contraception'),
                      icon: "💊",
                      description: getLocalizedText('desc.contraception'),
                      color: "from-pink-500 to-pink-600"
                    },
                    {
                      title: getLocalizedText('category.birthing.black'),
                      icon: "🛡️",
                      description: getLocalizedText('desc.birthing.black'),
                      color: "from-amber-500 to-amber-600"
                    },
                    {
                      title: getLocalizedText('category.marriage.baby'),
                      icon: "👶🏽",
                      description: getLocalizedText('desc.marriage.baby'),
                      color: "from-rose-500 to-rose-600"
                    },
                    {
                      title: getLocalizedText('category.sexual.health'),
                      icon: "💖",
                      description: getLocalizedText('desc.sexual.health'),
                      color: "from-teal-500 to-teal-600"
                    },
                    {
                      title: getLocalizedText('category.after.birth'),
                      icon: "🤱🏽",
                      description: getLocalizedText('desc.after.birth'),
                      color: "from-emerald-500 to-emerald-600"
                    },
                    {
                      title: getLocalizedText('category.intimacy.bleeding'),
                      icon: "🩸",
                      description: getLocalizedText('desc.intimacy.bleeding'),
                      color: "from-red-400 to-red-500"
                    },
                    {
                      title: getLocalizedText('category.thyroid'),
                      icon: "🔬",
                      description: getLocalizedText('desc.thyroid'),
                      color: "from-cyan-500 to-cyan-600"
                    },
                    {
                      title: getLocalizedText('category.diabetes'),
                      icon: "📊",
                      description: getLocalizedText('desc.diabetes'),
                      color: "from-orange-500 to-orange-600"
                    },
                    {
                      title: getLocalizedText('category.fgm'),
                      icon: "🤝",
                      description: getLocalizedText('desc.fgm'),
                      color: "from-violet-500 to-violet-600"
                    },
                    {
                      title: getLocalizedText('category.hormonal'),
                      icon: "📈",
                      description: getLocalizedText('desc.hormonal'),
                      color: "from-yellow-500 to-yellow-600"
                    },
                    {
                      title: getLocalizedText('category.preeclampsia'),
                      icon: "🚨",
                      description: getLocalizedText('desc.preeclampsia'),
                      color: "from-red-600 to-red-700"
                    },
                    {
                      title: getLocalizedText('category.csection'),
                      icon: "🏥",
                      description: getLocalizedText('desc.csection'),
                      color: "from-blue-600 to-blue-700"
                    },
                    {
                      title: getLocalizedText('category.postpartum.depression'),
                      icon: "😢",
                      description: getLocalizedText('desc.postpartum.depression'),
                      color: "from-slate-500 to-slate-600"
                    }


                  ].map((topic, index) => {
                    const handleCardClick = () => {
                      if (((isSubscribered === false || isSubscribered === null) && freeDayTrial === true) || checkSubDate === true) {
                        setActiveSection('profile')
                        return;
                      }
                      setSelectedTopic(topic);
                    };
                    return (
                      <>
                        {(((isSubscribered === false || isSubscribered === null) && freeDayTrial === true) || checkSubDate === true) && (
                          <Lock className="w-6 h-8 m-2 text-gray-500 absolute top-0 right-0 z-30" />
                        )}
                        <CarouselItem key={index} className="pl-1 basis-1/2 md:basis-1/3 lg:basis-1/4">
                          <Card
                            className={`relative overflow-hidden card-3d cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 ${(((isSubscribered === false || isSubscribered === null) && freeDayTrial === true) || checkSubDate === true) ? '' : ''
                              }`}
                            onClick={handleCardClick}
                          >
                            <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-600' : 'bg-gradient-to-br ' + topic.color + ' opacity-10'}`}></div>



                            <CardContent className="p-4 relative z-10 text-center">
                              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${topic.color} flex items-center justify-center text-white text-xl mb-3 mx-auto`}>
                                {topic.icon}
                              </div>
                              <h3 className={`font-semibold text-sm ${settings.darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>
                                {topic.title}
                              </h3>
                              <p className={`text-xs ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                {topic.description}
                              </p>
                            </CardContent>
                          </Card>
                        </CarouselItem>
                      </>

                    );
                  })}
              </CarouselContent>
            </Carousel>
          </>
        )}
      </div>

      {/* Understanding Health Conditions */}
      <div>

        <h2 className={`text-xl font-bold mb-4 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>
          {getLocalizedText('understanding.health.conditions')}
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {healthConditions.map((guide, index) => (
            <GuideCard key={index} guide={guide} sectionKey={`health-${index}`} />
          ))}
        </div>
      </div>

      {/* Period Management & Understanding */}
      <div>

        <h2 className={`text-xl font-bold mb-4 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>
          {getLocalizedText('period.management.understanding')}
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {periodManagement.map((guide, index) => (
            <GuideCard key={index} guide={guide} sectionKey={`period-${index}`} />
          ))}
        </div>
      </div>

      {/* Family Planning & Natural Remedies */}
      <div>

        <h2 className={`text-xl font-bold mb-1 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>
          {getLocalizedText('family.planning.natural.remedies')}
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {familyPlanning.map((guide, index) => (
            <GuideCard key={index} guide={guide} sectionKey={`family-${index}`} />
          ))}
        </div>
      </div>


      <Card className="relative overflow-hidden card-3d">
        <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : ' from-lavender-50 to-lavender-100 border-lavender-200'}`}></div>

        <CardHeader className="relative z-10">
          <CardTitle className={`text-xl font-bold ${settings.darkMode ? 'text-white' : 'text-lavender-800'}`}>
            {getLocalizedText('cycle.patterns')}
          </CardTitle>
        </CardHeader>

        <CardContent className="relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className={`text-sm mb-1 ${settings.darkMode ? 'text-gray-400' : 'text-lavender-600'}`}>{getLocalizedText('cycle.patterns.average.length')}</p>
              <p className={`text-lg font-bold ${settings.darkMode ? 'text-white' : 'text-lavender-800'}`}>28 {getLocalizedText('days')}</p>
            </div>
            <div className="text-center">
              <p className={`text-sm mb-1 ${settings.darkMode ? 'text-gray-400' : 'text-lavender-600'}`}>{getLocalizedText('cycle.patterns.period.duration')}</p>
              <p className={`text-lg font-bold ${settings.darkMode ? 'text-white' : 'text-lavender-800'}`}>5 {getLocalizedText('days')}</p>
            </div>
            <div className="text-center">
              <p className={`text-sm mb-1 ${settings.darkMode ? 'text-gray-400' : 'text-lavender-600'}`}>{getLocalizedText('cycle.patterns.regularity')}</p>
              <p className={`text-lg font-bold ${settings.darkMode ? 'text-white' : 'text-lavender-800'}`}>{getLocalizedText('high')}</p>
            </div>
          </div>
        </CardContent>
      </Card>



      {/* Health Reminders & Islamic Wellness */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


        <Card className="relative overflow-hidden card-3d">
          <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : ' from-blue-50 to-blue-100 border-blue-200'}`}></div>

          <CardHeader className="relative z-10">
            <CardTitle className={`flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-blue-800'}`}>
              <Heart className="w-5 h-5" />
              {getLocalizedText('health.reminders')}
            </CardTitle>
          </CardHeader>

          <CardContent className="relative z-10">
            <ul className={`space-y-2 text-sm ${settings.darkMode ? 'text-gray-300' : 'text-blue-700'}`}>
              {[getLocalizedText('stay.hydrated.during.cycle'),
              getLocalizedText('maintain.proper.hygiene'),
              getLocalizedText('track.unusual.symptoms'),
              getLocalizedText('consult.healthcare.providers')].map((text, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className={`${settings.darkMode ? 'text-blue-400' : 'text-blue-500'} mt-1`}>•</span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden card-3d">
          <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : ' from-green-50 to-green-100 border-green-200'}`}></div>

          <CardHeader className="relative z-10">
            <CardTitle className={`flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-green-800'}`}>
              <Moon className="w-5 h-5" />
              {getLocalizedText('islamic.wellness')}
            </CardTitle>
          </CardHeader>

          <CardContent className="relative z-10">
            <ul className={`space-y-2 text-sm ${settings.darkMode ? 'text-gray-300' : 'text-green-700'}`}>
              {[getLocalizedText('understanding.your.body.is.sunnah'),
              getLocalizedText('seek.knowledge.about.health'),
              getLocalizedText('maintain.spiritual.and.physical.purity'),
              getLocalizedText('trust.in.allahs.wisdom')].map((text, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className={`${settings.darkMode ? 'text-green-400' : 'text-green-500'} mt-1`}>•</span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>




      </div>

      {/* Islamic Health Wisdom */}


      <Card className="relative overflow-hidden card-3d">
        <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : ' from-lavender-600 via-lavender-500 to-lavender-800 border-lavender-200'}`}></div>

        <div className={`absolute inset-0 ${settings.darkMode ? 'hidden' : 'opacity-20'}`}>
          <div className="animate-pulse absolute top-0 right-0 w-16 h-16 bg-lavender-300 rounded-full"></div>
          <div className="animate-pulse absolute bottom-0 left-0 w-12 h-12 bg-lavender-400 rounded-full animation-delay-700"></div>
        </div>

        <CardContent className="p-6 text-center relative z-10">
          <h2 className={`text-xl font-bold mb-4 ${settings.darkMode ? 'text-white' : 'text-lavender-800'}`}>
            {getLocalizedText('islamic.health.wisdom')}
          </h2>
          <p className={`text-base mb-2 ${settings.darkMode ? 'text-gray-300' : 'text-purple-900'}`}>
            {getLocalizedText('health.wisdom.quote')}
          </p>
          <p className={`text-sm opacity-75 mb-4 ${settings.darkMode ? 'text-gray-400' : 'text-purple-900'}`}>
            - Sahih Bukhari 5678
          </p>
          <p className={`text-sm opacity-80 ${settings.darkMode ? 'text-gray-400' : 'text-purple-900'}`}>
            {getLocalizedText('seeking.knowledge.about.health')}
          </p>
        </CardContent>
      </Card>


    </div>
  );
};

export default HealthInsights;
