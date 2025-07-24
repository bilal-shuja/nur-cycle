import React, { useState , useEffect } from 'react';
import { Heart, Activity, Moon, Droplets, Brain, TrendingUp, Book, Shield, Baby, Flower, Star, Calendar, Clock, Target, AlertCircle, Coffee, Scale, Stethoscope, Thermometer, Leaf, Info, CheckCircle, AlertTriangle, ChevronDown, ChevronUp, Users, Pill, User, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const HealthInsights = () => {
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
  
  // State for collapsible sections
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const dischargeTypes = [
    {
      id: 'white',
      title: 'White Discharge',
      color: 'bg-gray-100 border-gray-300',
      textColor: 'text-gray-800',
      icon: '⚪',
      status: 'safe',
      brief: 'Usually normal, especially around ovulation',
      detailed: 'Normal cervical mucus or sign of healthy vaginal environment. Monitor for any changes in odor or texture. Normal discharge does not affect wudu unless accompanied by other impurities.'
    },
    {
      id: 'yellow',
      title: 'Yellow Discharge',
      color: 'bg-yellow-100 border-yellow-300',
      textColor: 'text-yellow-800',
      icon: '🟡',
      status: 'caution',
      brief: 'May indicate infection if foul-smelling',
      detailed: 'Could be bacterial infection, STI, or sometimes normal if light yellow. See healthcare provider if accompanied by odor, itching, or pain. If abnormal discharge affects purity, consult a scholar about prayer requirements.'
    },
    {
      id: 'white-clumpy',
      title: 'White Clumpy',
      color: 'bg-gray-200 border-gray-400',
      textColor: 'text-gray-800',
      icon: '🧀',
      status: 'attention',
      brief: 'Often a sign of yeast infection',
      detailed: 'Overgrowth of Candida fungus in the vagina. Consult healthcare provider for antifungal treatment. During treatment, maintain regular purification practices unless medically advised otherwise.'
    },
    {
      id: 'clear',
      title: 'Clear Discharge',
      color: 'bg-blue-50 border-blue-200',
      textColor: 'text-blue-800',
      icon: '💧',
      status: 'safe',
      brief: 'Normal around ovulation and arousal',
      detailed: 'Healthy cervical mucus, often indicates fertile period. Completely normal, no action needed. Natural discharge is pure and does not invalidate wudu.'
    },
    {
      id: 'brown',
      title: 'Brown Discharge',
      color: 'bg-amber-100 border-amber-300',
      textColor: 'text-amber-800',
      icon: '🟤',
      status: 'safe',
      brief: 'Old blood from menstruation or spotting',
      detailed: 'Old blood that has oxidized, common at start/end of periods. Normal if during menstrual cycle. Brown discharge during menstrual days is considered hayd. Outside menstrual period, may be istihada.'
    },
    {
      id: 'pink',
      title: 'Pink Discharge',
      color: 'bg-pink-100 border-pink-300',
      textColor: 'text-pink-800',
      icon: '🌸',
      status: 'safe',
      brief: 'Light bleeding or spotting',
      detailed: 'Light bleeding mixed with cervical fluid. Usually normal, track patterns. If occurs during menstrual window, counts as hayd. If outside, may be istihādah.'
    },
    {
      id: 'green',
      title: 'Green Discharge',
      color: 'bg-green-100 border-green-400',
      textColor: 'text-green-800',
      icon: '🟢',
      status: 'urgent',
      brief: 'Potential bacterial infection',
      detailed: 'Often indicates bacterial vaginosis or STI. Seek immediate medical attention. During treatment, maintain purity as much as possible and consult scholar if needed.'
    },
    {
      id: 'gray',
      title: 'Gray Discharge',
      color: 'bg-slate-100 border-slate-400',
      textColor: 'text-slate-800',
      icon: '⚫',
      status: 'urgent',
      brief: 'Associated with bacterial vaginosis',
      detailed: 'Bacterial imbalance in vaginal environment. Consult healthcare provider promptly. Abnormal discharge may affect ritual purity - seek both medical and Islamic guidance.'
    }
  ];

  const bloodTypes = [
    {
      id: 'bright-red',
      title: 'Bright Red',
      color: 'bg-red-100 border-red-300',
      textColor: 'text-red-800',
      icon: '🔴',
      status: 'safe',
      brief: 'Fresh, active menstrual flow',
      detailed: 'Healthy menstrual flow, usually normal in early to mid-period. This is considered valid menstruation (hayd) and requires ghusl at the end of your cycle. You should not pray or fast during this time.'
    },
    {
      id: 'dark-red',
      title: 'Dark Red',
      color: 'bg-red-200 border-red-400',
      textColor: 'text-red-900',
      icon: '🟤',
      status: 'safe',
      brief: 'Thicker, deeper color blood',
      detailed: 'Normal menstrual blood, possibly due to slower flow. Also considered hayd if it follows your usual cycle pattern. Continue to refrain from acts of worship that require purity.'
    },
    {
      id: 'brown',
      title: 'Brown Blood',
      color: 'bg-amber-100 border-amber-400',
      textColor: 'text-amber-800',
      icon: '🟫',
      status: 'safe',
      brief: 'Old, oxidized blood',
      detailed: 'Old oxidized blood, normal if within your menstrual window. If within your usual period duration, it is hayd. If seen before or after your period timeframe, it may be istihādah.'
    },
    {
      id: 'pink',
      title: 'Pink Blood',
      color: 'bg-pink-100 border-pink-300',
      textColor: 'text-pink-800',
      icon: '🌸',
      status: 'safe',
      brief: 'Light flow or spotting',
      detailed: 'Light flow or spotting, possible hormonal changes. If this occurs during your period time, it is counted as menstruation. If seen outside your normal period window, consult a scholar.'
    },
    {
      id: 'black',
      title: 'Black Blood',
      color: 'bg-gray-200 border-gray-500',
      textColor: 'text-gray-800',
      icon: '⚫',
      status: 'attention',
      brief: 'Very old blood',
      detailed: 'Old blood that has taken longer to exit. Considered hayd if it aligns with your regular cycle days. If persistent or outside usual days, it may not be menstrual.'
    },
    {
      id: 'orange',
      title: 'Orange Blood',
      color: 'bg-orange-100 border-orange-300',
      textColor: 'text-orange-800',
      icon: '🟠',
      status: 'caution',
      brief: 'Mixed with discharge',
      detailed: 'May be early period blood or could indicate infection. If this occurs during menstruation, it is considered hayd. Monitor for other symptoms, seek medical care if accompanied by odor or pain.'
    },
    {
      id: 'gray',
      title: 'Gray Blood',
      color: 'bg-slate-200 border-slate-400',
      textColor: 'text-slate-800',
      icon: '🔘',
      status: 'urgent',
      brief: 'Requires immediate attention',
      detailed: 'May indicate bacterial infection or miscarriage. Seek immediate medical evaluation. Gray discharge requires both medical attention and Islamic guidance due to potential complications.'
    }
  ];

  const pregnancySigns = [
    {
      id: 'missed-period',
      title: 'Missed Period',
      icon: '📅',
      brief: 'Most common early sign of pregnancy',
      detailed: 'If your period is late by more than a week and you have a regular cycle, this could be the first sign of pregnancy. However, stress, illness, or hormonal changes can also cause delays. Take a pregnancy test if your period is significantly late.',
      status: 'attention'
    },
    {
      id: 'implantation-bleeding',
      title: 'Implantation Bleeding',
      icon: '🩸',
      brief: 'Light spotting 6-12 days after conception',
      detailed: 'Light pink or brown spotting that occurs when the fertilized egg attaches to the uterine wall. This is lighter and shorter than a regular period, lasting only 1-2 days. Not all women experience this, and it can be confused with a light period.',
      status: 'safe'
    },
    {
      id: 'breast-changes',
      title: 'Breast Tenderness',
      icon: '🤱',
      brief: 'Swollen, tender, or heavy feeling breasts',
      detailed: 'Hormonal changes can make breasts feel tender, swollen, or fuller than usual. The areolas may also darken or become more sensitive. These changes can occur as early as 1-2 weeks after conception.',
      status: 'safe'
    },
    {
      id: 'nausea',
      title: 'Morning Sickness',
      icon: '🤢',
      brief: 'Nausea with or without vomiting',
      detailed: 'Despite its name, morning sickness can occur at any time of day. It typically begins around 6 weeks of pregnancy but can start as early as 4 weeks. This is caused by rising hormone levels, particularly HCG.',
      status: 'safe'
    },
    {
      id: 'fatigue',
      title: 'Extreme Fatigue',
      icon: '😴',
      brief: 'Unusual tiredness and exhaustion',
      detailed: 'Feeling unusually tired or exhausted, even after adequate rest. This is caused by rising progesterone levels and increased blood production. Fatigue is one of the earliest pregnancy symptoms, often occurring before a missed period.',
      status: 'safe'
    },
    {
      id: 'frequent-urination',
      title: 'Frequent Urination',
      icon: '🚽',
      brief: 'Need to urinate more often than usual',
      detailed: 'Increased frequency of urination due to hormonal changes and increased blood flow to the kidneys. This symptom can begin as early as 6-8 weeks into pregnancy and continues throughout.',
      status: 'safe'
    },
    {
      id: 'food-aversions',
      title: 'Food Aversions',
      icon: '🤮',
      brief: 'Strong dislike for certain foods or smells',
      detailed: 'Sudden aversion to foods you normally enjoy, or increased sensitivity to smells. This is caused by hormonal changes and can be one of the first signs of pregnancy, often accompanying morning sickness.',
      status: 'safe'
    },
    {
      id: 'mood-changes',
      title: 'Mood Swings',
      icon: '😢',
      brief: 'Emotional changes and mood fluctuations',
      detailed: 'Feeling more emotional, irritable, or weepy than usual due to hormonal fluctuations. These mood changes are similar to PMS symptoms but may be more intense during early pregnancy.',
      status: 'safe'
    },
    {
      id: 'cramping',
      title: 'Mild Cramping',
      icon: '🩹',
      brief: 'Light cramping in the lower abdomen',
      detailed: 'Mild cramping or pulling sensations in the lower abdomen, similar to but usually lighter than menstrual cramps. This can be caused by implantation or the uterus beginning to expand.',
      status: 'caution'
    },
    {
      id: 'basal-temperature',
      title: 'Elevated Basal Temperature',
      icon: '🌡️',
      brief: 'Body temperature remains high after ovulation',
      detailed: 'If you track your basal body temperature, it typically drops before menstruation. If it remains elevated for more than 18 days after ovulation, this could indicate pregnancy.',
      status: 'safe'
    }
  ];

  const pcosTopics = [
    {
      id: 'irregular-periods',
      title: 'Irregular Periods',
      icon: '📅',
      brief: 'Unpredictable or absent menstrual cycles',
      detailed: 'PCOS often causes irregular, infrequent, or absent periods due to hormonal imbalances. You may have fewer than 8 periods per year or go months without menstruating. This affects about 70% of women with PCOS.',
      status: 'attention'
    },
    {
      id: 'excess-androgens',
      title: 'Excess Androgens',
      icon: '🧔',
      brief: 'High levels of male hormones',
      detailed: 'Elevated androgen levels can cause hirsutism (excess hair growth on face, chest, back), male-pattern baldness, severe acne, and oily skin. Blood tests can confirm elevated testosterone or other androgen levels.',
      status: 'attention'
    },
    {
      id: 'insulin-resistance',
      title: 'Insulin Resistance',
      icon: '🍯',
      brief: 'Body\'s reduced response to insulin',
      detailed: 'Up to 80% of women with PCOS have insulin resistance, making it harder for cells to use glucose effectively. This can lead to weight gain, difficulty losing weight, and increased risk of diabetes.',
      status: 'caution'
    },
    {
      id: 'weight-management',
      title: 'Weight Management',
      icon: '⚖️',
      brief: 'Difficulty maintaining healthy weight',
      detailed: 'Many women with PCOS struggle with weight gain and difficulty losing weight due to insulin resistance and hormonal imbalances. Even a 5-10% weight loss can significantly improve symptoms.',
      status: 'attention'
    },
    {
      id: 'fertility-issues',
      title: 'Fertility Challenges',
      icon: '👶',
      brief: 'Difficulty conceiving due to irregular ovulation',
      detailed: 'PCOS is a leading cause of infertility due to irregular or absent ovulation. However, many women with PCOS can conceive with proper treatment and lifestyle modifications.',
      status: 'attention'
    },
    {
      id: 'skin-issues',
      title: 'Skin Problems',
      icon: '🔴',
      brief: 'Acne, oily skin, and dark patches',
      detailed: 'Hormonal imbalances can cause persistent acne, oily skin, and acanthosis nigricans (dark, velvety patches of skin, usually on the neck, armpits, or groin).',
      status: 'caution'
    },
    {
      id: 'mood-disorders',
      title: 'Mood & Mental Health',
      icon: '🧠',
      brief: 'Increased risk of anxiety and depression',
      detailed: 'Women with PCOS have higher rates of anxiety, depression, and eating disorders. Hormonal fluctuations and the stress of managing symptoms can impact mental health significantly.',
      status: 'attention'
    },
    {
      id: 'sleep-apnea',
      title: 'Sleep Disorders',
      icon: '😴',
      brief: 'Higher risk of sleep apnea',
      detailed: 'Women with PCOS are at increased risk for sleep apnea and other sleep disorders, which can worsen insulin resistance and make weight management more difficult.',
      status: 'caution'
    },
    {
      id: 'dietary-management',
      title: 'Dietary Approaches',
      icon: '🥗',
      brief: 'Nutrition strategies for PCOS management',
      detailed: 'A low-glycemic diet, anti-inflammatory foods, and regular meal timing can help manage insulin resistance. Consider working with a registered dietitian familiar with PCOS.',
      status: 'safe'
    },
    {
      id: 'exercise-benefits',
      title: 'Exercise & Movement',
      icon: '🏃‍♀️',
      brief: 'Physical activity benefits for PCOS',
      detailed: 'Regular exercise can improve insulin sensitivity, help with weight management, reduce inflammation, and improve mood. Both cardio and strength training are beneficial for PCOS management.',
      status: 'safe'
    }
  ];

  const endometriosisTopics = [
    {
      id: 'pelvic-pain',
      title: 'Pelvic Pain',
      icon: '🩹',
      brief: 'Chronic pain in the pelvic region',
      detailed: 'Persistent pelvic pain that may worsen during menstruation. The pain can be sharp, cramping, or a dull ache, and may be felt in the lower back, abdomen, or pelvis.',
      status: 'attention'
    },
    {
      id: 'painful-periods',
      title: 'Painful Menstruation',
      icon: '😣',
      brief: 'Severe menstrual cramps and pain',
      detailed: 'Dysmenorrhea that is often more severe than typical menstrual cramps. Pain may begin before menstruation and extend several days into the cycle.',
      status: 'attention'
    },
    {
      id: 'heavy-bleeding',
      title: 'Heavy Menstrual Bleeding',
      icon: '🩸',
      brief: 'Excessive menstrual flow',
      detailed: 'Menorrhagia or unusually heavy periods that may include large clots. You may need to change pads or tampons every hour or use two products simultaneously.',
      status: 'caution'
    },
    {
      id: 'painful-intercourse',
      title: 'Pain During Intimacy',
      icon: '💔',
      brief: 'Discomfort during or after intercourse',
      detailed: 'Deep pain during or after sexual intercourse, which may be caused by endometrial tissue on organs behind the uterus or lower vagina.',
      status: 'attention'
    },
    {
      id: 'fertility-concerns',
      title: 'Fertility Issues',
      icon: '👶',
      brief: 'Difficulty conceiving',
      detailed: 'Endometriosis can affect fertility by causing scarring, blocking fallopian tubes, or affecting egg quality. However, many women with endometriosis can still conceive.',
      status: 'attention'
    },
    {
      id: 'digestive-symptoms',
      title: 'Digestive Problems',
      icon: '🤢',
      brief: 'Bowel and bladder issues',
      detailed: 'Painful bowel movements, constipation, diarrhea, bloating, or painful urination, especially during menstruation if endometrial tissue affects the bowel or bladder.',
      status: 'caution'
    },
    {
      id: 'fatigue',
      title: 'Chronic Fatigue',
      icon: '😴',
      brief: 'Persistent tiredness and exhaustion',
      detailed: 'Ongoing fatigue that may be related to the body\'s inflammatory response to endometriosis, chronic pain, or heavy menstrual bleeding causing anemia.',
      status: 'attention'
    },
    {
      id: 'pain-management',
      title: 'Pain Management',
      icon: '💊',
      brief: 'Strategies for managing endometriosis pain',
      detailed: 'Various approaches including NSAIDs, hormonal treatments, heat therapy, gentle exercise, and stress management techniques can help manage endometriosis pain.',
      status: 'safe'
    },
    {
      id: 'emotional-support',
      title: 'Emotional Well-being',
      icon: '💚',
      brief: 'Mental health and coping strategies',
      detailed: 'Living with chronic pain can affect mental health. Support groups, counseling, and stress management techniques can be valuable for emotional well-being.',
      status: 'safe'
    },
    {
      id: 'treatment-options',
      title: 'Treatment Approaches',
      icon: '🏥',
      brief: 'Medical and surgical treatment options',
      detailed: 'Treatment may include pain medication, hormone therapy, or surgery. Work with your healthcare provider to develop a treatment plan that addresses your specific symptoms and goals.',
      status: 'safe'
    }
  ];

  const crampTriggers = [
    {
      id: 'caffeine',
      title: 'Caffeine Intake',
      icon: '☕',
      brief: 'Coffee and caffeinated drinks can worsen cramps',
      detailed: 'Caffeine can constrict blood vessels and increase muscle tension, potentially making menstrual cramps more severe. Try limiting coffee, tea, and energy drinks during your period.',
      status: 'caution'
    },
    {
      id: 'processed-foods',
      title: 'Processed Foods',
      icon: '🍟',
      brief: 'High-sodium and processed foods increase inflammation',
      detailed: 'Foods high in sodium, trans fats, and artificial additives can increase inflammation and water retention, making cramps and bloating worse. Opt for whole, unprocessed foods instead.',
      status: 'caution'
    },
    {
      id: 'sugar',
      title: 'High Sugar Intake',
      icon: '🍰',
      brief: 'Excess sugar can intensify pain and mood swings',
      detailed: 'High sugar intake can cause blood sugar spikes and crashes, increasing inflammation and making you more sensitive to pain. It can also worsen mood swings and energy crashes.',
      status: 'caution'
    },
    {
      id: 'dehydration',
      title: 'Dehydration',
      icon: '💧',
      brief: 'Not drinking enough water worsens cramps',
      detailed: 'Dehydration can make muscles more prone to cramping and increase overall discomfort. Staying well-hydrated helps maintain proper muscle function and can reduce the severity of cramps.',
      status: 'attention'
    },
    {
      id: 'stress',
      title: 'Stress & Anxiety',
      icon: '😰',
      brief: 'High stress levels can amplify period pain',
      detailed: 'Stress increases cortisol levels and can make you more sensitive to pain. It also causes muscle tension, which can worsen cramps. Practice stress management techniques during your period.',
      status: 'attention'
    },
    {
      id: 'lack-of-movement',
      title: 'Sedentary Lifestyle',
      icon: '🛋️',
      brief: 'Lack of movement can increase cramping',
      detailed: 'Sitting or lying down for extended periods can worsen cramps by reducing blood flow. Gentle movement and stretching can help improve circulation and reduce pain.',
      status: 'caution'
    },
    {
      id: 'poor-posture',
      title: 'Poor Posture',
      icon: '🪑',
      brief: 'Bad posture can worsen pelvic and back pain',
      detailed: 'Slouching or poor posture can put additional pressure on your pelvic area and lower back, intensifying menstrual pain. Maintain good posture and consider ergonomic support.',
      status: 'caution'
    },
    {
      id: 'inadequate-sleep',
      title: 'Sleep Deprivation',
      icon: '😴',
      brief: 'Poor sleep makes pain worse',
      detailed: 'Lack of sleep lowers your pain threshold and affects hormone regulation, making cramps feel more severe. Aim for 7-9 hours of quality sleep, especially during your period.',
      status: 'attention'
    },
    {
      id: 'smoking',
      title: 'Smoking',
      icon: '🚬',
      brief: 'Smoking reduces oxygen flow and worsens pain',
      detailed: 'Smoking reduces oxygen flow to the pelvic area and can make menstrual cramps more severe. It also affects hormone levels and can worsen PMS symptoms.',
      status: 'urgent'
    },
    {
      id: 'alcohol',
      title: 'Alcohol Consumption',
      icon: '🍷',
      brief: 'Alcohol can disrupt hormones and increase inflammation',
      detailed: 'Alcohol can disrupt hormone balance, increase inflammation, and worsen mood swings. It can also interfere with sleep quality, making you more sensitive to pain.',
      status: 'caution'
    }
  ];

  const latePeriodsReasons = [
    {
      id: 'stress-impact',
      title: 'Stress & Emotional Factors',
      icon: '😰',
      brief: 'High stress can delay ovulation and periods',
      detailed: 'Chronic stress increases cortisol levels, which can interfere with the hormones that regulate your menstrual cycle. Major life changes, work stress, or emotional trauma can delay or skip periods.',
      status: 'attention'
    },
    {
      id: 'weight-changes',
      title: 'Significant Weight Changes',
      icon: '⚖️',
      brief: 'Rapid weight loss or gain affects hormones',
      detailed: 'Sudden weight loss, excessive exercise, or significant weight gain can disrupt hormone production and delay periods. Your body needs adequate fat stores to produce hormones properly.',
      status: 'caution'
    },
    {
      id: 'hormonal-imbalances',
      title: 'Hormonal Disorders',
      icon: '🧬',
      brief: 'Conditions like PCOS or thyroid issues',
      detailed: 'Polycystic ovary syndrome (PCOS), thyroid disorders, or other hormonal imbalances can cause irregular or missed periods. These conditions affect the delicate balance of reproductive hormones.',
      status: 'attention'
    },
    {
      id: 'medications',
      title: 'Medication Effects',
      icon: '💊',
      brief: 'Certain medications can delay periods',
      detailed: 'Birth control pills, antidepressants, antipsychotics, and some other medications can affect your menstrual cycle. Starting or stopping medications can temporarily disrupt your cycle.',
      status: 'caution'
    },
    {
      id: 'excessive-exercise',
      title: 'Intense Physical Activity',
      icon: '🏃‍♀️',
      brief: 'Over-exercising can suppress menstruation',
      detailed: 'Intense or excessive exercise can suppress ovulation and menstruation, especially in athletes or those with low body weight. This is called exercise-induced amenorrhea.',
      status: 'caution'
    },
    {
      id: 'illness-infection',
      title: 'Illness & Infections',
      icon: '🤒',
      brief: 'Being sick can temporarily delay periods',
      detailed: 'Acute illness, infections, or chronic health conditions can temporarily disrupt your menstrual cycle as your body focuses energy on recovery rather than reproduction.',
      status: 'caution'
    },
    {
      id: 'travel-changes',
      title: 'Travel & Time Zone Changes',
      icon: '✈️',
      brief: 'Travel stress and schedule changes affect cycles',
      detailed: 'Long-distance travel, especially across time zones, can disrupt your body\'s natural rhythms and temporarily affect your menstrual cycle. This usually resolves within 1-2 cycles.',
      status: 'safe'
    },
    {
      id: 'age-factors',
      title: 'Age-Related Changes',
      icon: '📅',
      brief: 'Perimenopause or adolescence irregularities',
      detailed: 'Teenagers may have irregular cycles as their bodies mature, while women in their 40s may experience perimenopause, causing irregular or missed periods.',
      status: 'safe'
    },
    {
      id: 'breastfeeding',
      title: 'Breastfeeding',
      icon: '🤱',
      brief: 'Nursing can suppress ovulation and periods',
      detailed: 'Breastfeeding releases prolactin, which can suppress ovulation and menstruation. This is more common with exclusive breastfeeding and frequent nursing sessions.',
      status: 'safe'
    },
    {
      id: 'sleep-disruption',
      title: 'Sleep Pattern Changes',
      icon: '🌙',
      brief: 'Irregular sleep schedules can affect hormones',
      detailed: 'Shift work, insomnia, or major changes in sleep patterns can disrupt your circadian rhythm and the hormones that regulate your menstrual cycle.',
      status: 'caution'
    }
  ];

  const periodLengthFactors = [
    {
      id: 'hormonal-fluctuations',
      title: 'Natural Hormone Changes',
      icon: '🌊',
      brief: 'Normal monthly variations in hormone levels',
      detailed: 'Slight variations in estrogen and progesterone levels can naturally cause your period to be a day or two shorter or longer from month to month. This is completely normal.',
      status: 'safe'
    },
    {
      id: 'birth-control-effects',
      title: 'Birth Control Impact',
      icon: '💊',
      brief: 'Hormonal contraceptives can alter period length',
      detailed: 'Birth control pills, patches, rings, or IUDs can make periods lighter and shorter, or in some cases, longer. Some methods may eventually stop periods altogether.',
      status: 'safe'
    },
    {
      id: 'age-related-changes',
      title: 'Age & Life Stage',
      icon: '📅',
      brief: 'Periods change throughout your reproductive years',
      detailed: 'Teenagers often have irregular period lengths as their cycles establish. Women approaching menopause may experience shorter or longer periods as hormone levels fluctuate.',
      status: 'safe'
    },
    {
      id: 'stress-lifestyle',
      title: 'Stress & Lifestyle Factors',
      icon: '😰',
      brief: 'Life changes can affect period duration',
      detailed: 'High stress, significant weight changes, intense exercise, or major life changes can temporarily alter the length of your periods by affecting hormone production.',
      status: 'caution'
    },
    {
      id: 'underlying-conditions',
      title: 'Medical Conditions',
      icon: '🩺',
      brief: 'Health conditions can impact period length',
      detailed: 'Conditions like PCOS, endometriosis, thyroid disorders, or uterine fibroids can cause periods to be consistently longer or shorter than normal.',
      status: 'attention'
    },
    {
      id: 'medication-influence',
      title: 'Medication Side Effects',
      icon: '💉',
      brief: 'Certain drugs can change period characteristics',
      detailed: 'Blood thinners, antidepressants, steroids, and other medications can affect the length and heaviness of your periods. Consult your healthcare provider about any concerns.',
      status: 'caution'
    },
    {
      id: 'nutritional-factors',
      title: 'Diet & Nutrition',
      icon: '🥗',
      brief: 'Poor nutrition can affect menstrual health',
      detailed: 'Severe calorie restriction, eating disorders, or nutritional deficiencies can cause periods to become lighter, shorter, or irregular as the body conserves energy.',
      status: 'caution'
    },
    {
      id: 'pregnancy-breastfeeding',
      title: 'Pregnancy & Breastfeeding',
      icon: '🤱',
      brief: 'Reproductive states that affect cycles',
      detailed: 'Recent pregnancy, miscarriage, or breastfeeding can temporarily affect period length and regularity as your body readjusts hormonally.',
      status: 'safe'
    },
    {
      id: 'exercise-impact',
      title: 'Physical Activity Levels',
      icon: '🏃‍♀️',
      brief: 'Exercise intensity can influence period length',
      detailed: 'Very intense training can make periods lighter and shorter, while moderate exercise may help regulate cycles. Sudden changes in activity level can temporarily affect periods.',
      status: 'caution'
    },
    {
      id: 'when-to-worry',
      title: 'When to Seek Help',
      icon: '🚨',
      brief: 'Warning signs that need medical attention',
      detailed: 'See a healthcare provider if your periods suddenly become very short (less than 2 days), very long (more than 7 days), or if you experience severe pain, very heavy bleeding, or periods stop entirely.',
      status: 'attention'
    }
  ];

  const contraceptionTopics = [
    {
      id: 'islamic-perspective',
      title: 'Islamic Views on Family Planning',
      icon: '🌙',
      brief: 'Religious guidance on contraception',
      detailed: 'Islam permits family planning for valid reasons such as health, economic concerns, or spacing children. Most scholars allow reversible contraception, while permanent sterilization is generally discouraged unless medically necessary.',
      status: 'safe'
    },
    {
      id: 'natural-methods',
      title: 'Natural Family Planning',
      icon: '📊',
      brief: 'Fertility awareness-based methods',
      detailed: 'Tracking ovulation through basal body temperature, cervical mucus changes, or calendar methods. These methods require dedication and education but have no side effects and align with natural body rhythms.',
      status: 'safe'
    },
    {
      id: 'barrier-methods',
      title: 'Barrier Contraceptives',
      icon: '🛡️',
      brief: 'Physical methods that prevent sperm from reaching egg',
      detailed: 'Condoms, diaphragms, and cervical caps physically block sperm. Condoms also protect against STIs. These methods are non-hormonal and can be used as needed.',
      status: 'safe'
    },
    {
      id: 'hormonal-options',
      title: 'Hormonal Contraceptives',
      icon: '💊',
      brief: 'Birth control pills, patches, and injections',
      detailed: 'Methods that use hormones to prevent ovulation. Include birth control pills, patches, rings, and shots. Very effective but may have side effects and aren\'t suitable for everyone.',
      status: 'caution'
    },
    {
      id: 'iud-options',
      title: 'Intrauterine Devices (IUDs)',
      icon: '🔹',
      brief: 'Long-term reversible contraception',
      detailed: 'Small devices placed in the uterus that prevent pregnancy for 3-10 years. Available in hormonal and non-hormonal (copper) types. Highly effective but require medical insertion.',
      status: 'caution'
    },
    {
      id: 'effectiveness-rates',
      title: 'Method Effectiveness',
      icon: '📈',
      brief: 'Comparing success rates of different methods',
      detailed: 'IUDs and implants are over 99% effective, birth control pills are 91-99% effective with perfect use, condoms are 85-98% effective, and natural methods vary from 76-99% depending on the method and consistency of use.',
      status: 'safe'
    },
    {
      id: 'side-effects',
      title: 'Understanding Side Effects',
      icon: '⚠️',
      brief: 'Potential risks and benefits of each method',
      detailed: 'Hormonal methods may cause mood changes, weight gain, or irregular bleeding. Copper IUDs may increase menstrual flow. Natural methods have no physical side effects but require significant commitment.',
      status: 'attention'
    },
    {
      id: 'choosing-method',
      title: 'Choosing the Right Method',
      icon: '🎯',
      brief: 'Factors to consider when selecting contraception',
      detailed: 'Consider your health history, lifestyle, relationship status, desire for future pregnancy, religious beliefs, and personal preferences. Consult with healthcare providers to make an informed decision.',
      status: 'safe'
    },
    {
      id: 'emergency-contraception',
      title: 'Emergency Contraception',
      icon: '🚨',
      brief: 'Options after unprotected intercourse',
      detailed: 'Emergency contraceptive pills (Plan B) or copper IUD insertion can prevent pregnancy if used within 3-5 days after unprotected intercourse. Consult Islamic scholars about emergency contraception use.',
      status: 'urgent'
    },
    {
      id: 'consultation-importance',
      title: 'Professional Consultation',
      icon: '👩‍⚕️',
      brief: 'Working with healthcare providers',
      detailed: 'Always consult qualified healthcare providers when choosing contraception. They can assess your individual health needs, discuss options, and monitor for any complications or side effects.',
      status: 'safe'
    }
  ];

  const naturalRemedies = [
    {
      id: 'heat-therapy',
      title: 'Heat Application',
      icon: '🔥',
      brief: 'Warmth helps relax uterine muscles',
      detailed: 'Apply heat pads, hot water bottles, or take warm baths to relax cramping muscles. Heat increases blood flow and can significantly reduce pain. Use for 15-20 minutes at a time.',
      status: 'safe'
    },
    {
      id: 'herbal-teas',
      title: 'Herbal Remedies',
      icon: '🫖',
      brief: 'Chamomile, ginger, and other healing teas',
      detailed: 'Chamomile tea has anti-inflammatory properties, ginger tea helps with nausea and pain, and raspberry leaf tea may help tone the uterus. Drink 2-3 cups daily during your period.',
      status: 'safe'
    },
    {
      id: 'essential-oils',
      title: 'Aromatherapy & Essential Oils',
      icon: '🌿',
      brief: 'Lavender, clary sage for pain relief',
      detailed: 'Diluted essential oils like lavender, clary sage, or marjoram can be massaged onto the lower abdomen. These oils have antispasmodic properties that may help reduce cramping.',
      status: 'safe'
    },
    {
      id: 'gentle-massage',
      title: 'Abdominal Massage',
      icon: '👐',
      brief: 'Circular motions to ease tension',
      detailed: 'Gentle circular massage on the lower abdomen and lower back can help relieve cramping. Use light pressure and massage for 5-10 minutes, optionally with diluted essential oils.',
      status: 'safe'
    },
    {
      id: 'yoga-stretches',
      title: 'Gentle Yoga & Stretching',
      icon: '🧘‍♀️',
      brief: 'Specific poses to relieve menstrual pain',
      detailed: 'Child\'s pose, cat-cow stretches, and supine twists can help relieve menstrual cramps. Gentle movement increases blood flow and releases endorphins that naturally reduce pain.',
      status: 'safe'
    },
    {
      id: 'sunnah-remedies',
      title: 'Prophetic Medicine',
      icon: '🍯',
      brief: 'Islamic traditional remedies',
      detailed: 'Honey, black seed (Nigella sativa), dates, and figs are mentioned in Islamic tradition for their healing properties. These natural foods can provide comfort and nutrition during menstruation.',
      status: 'safe'
    },
    {
      id: 'dietary-changes',
      title: 'Anti-inflammatory Foods',
      icon: '🥗',
      brief: 'Foods that reduce inflammation and pain',
      detailed: 'Omega-3 rich foods (salmon, walnuts), leafy greens, berries, and turmeric have anti-inflammatory properties. Avoid processed foods, excess sugar, and caffeine during your period.',
      status: 'safe'
    },
    {
      id: 'hydration',
      title: 'Proper Hydration',
      icon: '💧',
      brief: 'Water helps reduce bloating and cramping',
      detailed: 'Drinking plenty of water helps reduce bloating and can ease cramping. Warm water may be more soothing than cold. Add lemon or cucumber for flavor and additional benefits.',
      status: 'safe'
    },
    {
      id: 'magnesium-foods',
      title: 'Magnesium-Rich Foods',
      icon: '🥜',
      brief: 'Natural muscle relaxant from food sources',
      detailed: 'Dark chocolate, nuts, seeds, and leafy greens are rich in magnesium, which acts as a natural muscle relaxant. Magnesium deficiency can worsen menstrual cramps.',
      status: 'safe'
    },
    {
      id: 'rest-relaxation',
      title: 'Rest & Stress Management',
      icon: '🛌',
      brief: 'Adequate sleep and relaxation techniques',
      detailed: 'Ensure adequate sleep and practice stress-reduction techniques like deep breathing, meditation, or reading Quran. Stress can worsen menstrual symptoms, so prioritize self-care.',
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
          console.log('Settings loaded:', parsedSettings);
        } catch (error) {
          console.error('Error loading settings:', error);
        }
      }
      else {
      // Agar kuch save nahi hai, toh default light mode lagaye:
      document.documentElement.classList.remove('dark');
    }
  
      // Apply dark mode immediately if enabled:
  
      // const isDarkMode = savedSettings ? JSON.parse(savedSettings).darkMode : false;
      // if (isDarkMode) {
      //   document.documentElement.classList.add('dark');
      // }
  
  
    }, []);

  const getTopicContent = (topicTitle) => {
    const contentMap = {
      "Pregnancy Complications": [
        { icon: "🚨", title: "Warning Signs", description: "Recognize emergency symptoms requiring immediate medical attention" },
        { icon: "🩸", title: "Bleeding Issues", description: "Understanding different types of bleeding during pregnancy" },
        { icon: "🤢", title: "Severe Morning Sickness", description: "Managing hyperemesis gravidarum and severe nausea" },
        { icon: "💔", title: "High Blood Pressure", description: "Monitoring and managing pregnancy-related hypertension" },
        { icon: "🍼", title: "Gestational Diabetes", description: "Blood sugar management during pregnancy" },
        { icon: "🧬", title: "Genetic Concerns", description: "Understanding genetic testing and chromosomal abnormalities" },
        { icon: "⚖️", title: "Weight Management", description: "Healthy weight gain and complications from over/under gaining" },
        { icon: "🫁", title: "Breathing Problems", description: "Managing respiratory issues and when to seek help" },
        { icon: "🦴", title: "Physical Changes", description: "Dealing with back pain, joint issues, and physical discomfort" },
        { icon: "📱", title: "When to Call Doctor", description: "Emergency contact guidelines and red flag symptoms" }
      ],
      "Pregnancy Loss": [
        { icon: "💜", title: "Types of Loss", description: "Understanding miscarriage, stillbirth, and infant loss" },
        { icon: "🤝", title: "Emotional Support", description: "Grief counseling and emotional healing resources" },
        { icon: "👨‍👩‍👧‍👦", title: "Partner Support", description: "How partners can support each other through loss" },
        { icon: "📅", title: "Recovery Timeline", description: "Physical and emotional recovery expectations" },
        { icon: "🏥", title: "Medical Care", description: "Follow-up care and medical procedures after loss" },
        { icon: "👶", title: "Future Pregnancies", description: "Planning and preparing for subsequent pregnancies" },
        { icon: "💭", title: "Memory Making", description: "Creating lasting memories and honoring your baby" },
        { icon: "🌟", title: "Support Groups", description: "Finding community with others who understand" },
        { icon: "📖", title: "Resources", description: "Books, websites, and professional help options" },
        { icon: "💐", title: "Healing Rituals", description: "Meaningful ways to process grief and find peace" }
      ],
      "Working Moms": [
        { icon: "⏰", title: "Time Management", description: "Balancing work deadlines with family time effectively" },
        { icon: "👶", title: "Childcare Options", description: "Finding reliable daycare, nannies, and family support" },
        { icon: "🤱", title: "Breastfeeding at Work", description: "Pumping schedules and workplace lactation support" },
        { icon: "💼", title: "Career Advancement", description: "Navigating promotions and professional growth as a mother" },
        { icon: "😴", title: "Managing Fatigue", description: "Energy management and prioritizing rest and self-care" },
        { icon: "🏠", title: "Work-Life Balance", description: "Setting boundaries between professional and personal life" },
        { icon: "👥", title: "Support Networks", description: "Building relationships with other working parents" },
        { icon: "💰", title: "Financial Planning", description: "Budgeting for childcare and family expenses" },
        { icon: "🎯", title: "Goal Setting", description: "Adjusting career goals and expectations realistically" },
        { icon: "🌟", title: "Self-Care", description: "Maintaining personal wellness while juggling responsibilities" }
      ],
      "Sleep & Eating": [
        { icon: "😴", title: "Sleep Hygiene", description: "Creating optimal sleep environment and bedtime routines" },
        { icon: "🍎", title: "Nutritional Needs", description: "Essential nutrients during pregnancy and breastfeeding" },
        { icon: "⏰", title: "Meal Planning", description: "Preparing healthy meals when time and energy are limited" },
        { icon: "🤢", title: "Managing Nausea", description: "Foods and strategies to reduce morning sickness" },
        { icon: "💧", title: "Hydration", description: "Staying properly hydrated throughout pregnancy and postpartum" },
        { icon: "🥗", title: "Healthy Snacking", description: "Nutritious snack options for busy parents" },
        { icon: "😪", title: "Sleep Deprivation", description: "Coping with interrupted sleep and recovery strategies" },
        { icon: "🍽️", title: "Eating Disorders", description: "Managing relationship with food during body changes" },
        { icon: "⚡", title: "Energy Boosters", description: "Natural ways to increase energy without caffeine" },
        { icon: "🛏️", title: "Rest Strategies", description: "Power napping and rest techniques for busy mothers" }
      ],
      "Mental Health": [
        { icon: "🧠", title: "Postpartum Depression", description: "Recognizing symptoms and seeking professional help" },
        { icon: "😰", title: "Anxiety Management", description: "Coping strategies for pregnancy and parenting anxiety" },
        { icon: "💊", title: "Medication Safety", description: "Mental health medications during pregnancy and breastfeeding" },
        { icon: "🗣️", title: "Therapy Options", description: "Different types of counseling and mental health support" },
        { icon: "🧘", title: "Mindfulness", description: "Meditation and mindfulness practices for emotional wellness" },
        { icon: "👥", title: "Support Systems", description: "Building and maintaining emotional support networks" },
        { icon: "🌈", title: "Mood Changes", description: "Understanding hormonal impacts on mental health" },
        { icon: "💪", title: "Coping Skills", description: "Healthy strategies for managing stress and overwhelm" },
        { icon: "📱", title: "Crisis Resources", description: "Emergency mental health contacts and hotlines" },
        { icon: "🌟", title: "Self-Advocacy", description: "Speaking up about mental health needs with healthcare providers" }
      ],
      "Contraception": [
        { icon: "💊", title: "Birth Control Pills", description: "Types, effectiveness, and side effects of oral contraceptives" },
        { icon: "🛡️", title: "IUD Options", description: "Hormonal and copper IUD insertion, removal, and care" },
        { icon: "💉", title: "Injectable Methods", description: "Depo-Provera and other long-acting injectable contraceptives" },
        { icon: "🔒", title: "Barrier Methods", description: "Condoms, diaphragms, and cervical caps for pregnancy prevention" },
        { icon: "📅", title: "Natural Methods", description: "Fertility awareness and rhythm method family planning" },
        { icon: "⚕️", title: "Emergency Contraception", description: "Plan B and other emergency birth control options" },
        { icon: "✂️", title: "Permanent Options", description: "Tubal ligation and other sterilization procedures" },
        { icon: "🤱", title: "Breastfeeding", description: "Contraception options safe during breastfeeding" },
        { icon: "💰", title: "Cost and Access", description: "Insurance coverage and affordable contraception resources" },
        { icon: "🩺", title: "Choosing Methods", description: "Working with healthcare providers to select best option" }
      ],
      "Birthing While Black": [
        { icon: "🛡️", title: "Health Disparities", description: "Understanding maternal mortality rates and systemic issues" },
        { icon: "🗣️", title: "Self-Advocacy", description: "Speaking up for your needs and preferences during care" },
        { icon: "👩‍⚕️", title: "Provider Selection", description: "Finding culturally competent healthcare providers" },
        { icon: "📋", title: "Birth Plans", description: "Creating comprehensive birth plans that address your concerns" },
        { icon: "👥", title: "Support Teams", description: "Building a strong support network including doulas" },
        { icon: "📊", title: "Know Your Rights", description: "Understanding patient rights and informed consent" },
        { icon: "🏥", title: "Hospital Advocacy", description: "Navigating hospital systems and advocating for quality care" },
        { icon: "💪", title: "Empowerment", description: "Building confidence to advocate for yourself and your baby" },
        { icon: "🌟", title: "Resources", description: "Organizations and resources specifically for Black mothers" },
        { icon: "📚", title: "Education", description: "Learning about risks and how to minimize them" }
      ],
      "Marriage & New Baby": [
        { icon: "💕", title: "Relationship Changes", description: "How becoming parents affects romantic relationships" },
        { icon: "🗣️", title: "Communication", description: "Maintaining open dialogue during stressful transitions" },
        { icon: "⚖️", title: "Responsibility Sharing", description: "Dividing childcare and household duties fairly" },
        { icon: "💤", title: "Intimacy Challenges", description: "Navigating physical and emotional intimacy changes" },
        { icon: "💰", title: "Financial Stress", description: "Managing money tensions with new family expenses" },
        { icon: "👥", title: "Extended Family", description: "Setting boundaries with in-laws and family members" },
        { icon: "⏰", title: "Couple Time", description: "Making time for each other amid parenting demands" },
        { icon: "🎯", title: "Goal Alignment", description: "Ensuring you're working toward shared family goals" },
        { icon: "💔", title: "Conflict Resolution", description: "Healthy ways to handle disagreements and stress" },
        { icon: "🌟", title: "Strengthening Bond", description: "Activities and practices to deepen your connection" }
      ],
      "Sexual Health": [
        { icon: "💖", title: "Intimacy During Pregnancy", description: "Safe sex practices and comfort during pregnancy" },
        { icon: "🩺", title: "STI Prevention", description: "Testing, prevention, and treatment of sexually transmitted infections" },
        { icon: "🤱", title: "Postpartum Recovery", description: "When and how to resume sexual activity after childbirth" },
        { icon: "💊", title: "Contraception", description: "Birth control options and family planning" },
        { icon: "😔", title: "Low Libido", description: "Understanding and addressing changes in sexual desire" },
        { icon: "💧", title: "Vaginal Health", description: "Maintaining vaginal health and addressing concerns" },
        { icon: "🗣️", title: "Communication", description: "Talking openly with partners about sexual needs and concerns" },
        { icon: "⚕️", title: "Healthcare", description: "Regular gynecological care and sexual health screenings" },
        { icon: "🧠", title: "Mental Health", description: "How mental health affects sexual wellness and vice versa" },
        { icon: "📚", title: "Education", description: "Learning about sexual anatomy, pleasure, and health" }
      ],
      "After Birth": [
        { icon: "🩸", title: "Postpartum Bleeding", description: "Normal lochia and when to be concerned about bleeding" },
        { icon: "🤱", title: "Breastfeeding", description: "Establishing milk supply and troubleshooting common issues" },
        { icon: "😴", title: "Sleep Recovery", description: "Adjusting to newborn sleep patterns and getting rest" },
        { icon: "💪", title: "Physical Recovery", description: "Healing from vaginal or cesarean delivery" },
        { icon: "🧠", title: "Emotional Changes", description: "Baby blues, mood swings, and postpartum mental health" },
        { icon: "🍽️", title: "Nutrition", description: "Postpartum nutrition for healing and breastfeeding" },
        { icon: "👶", title: "Newborn Care", description: "Learning to care for your baby's basic needs" },
        { icon: "🏥", title: "Follow-up Care", description: "Postpartum checkups and when to call your provider" },
        { icon: "👥", title: "Support Systems", description: "Building help networks for postpartum period" },
        { icon: "🌟", title: "Self-Care", description: "Taking care of yourself while caring for your baby" }
      ],
      "Intimacy & Bleeding": [
        { icon: "💕", title: "Resuming Intimacy", description: "When and how to resume sexual activity after birth" },
        { icon: "🩸", title: "Bleeding Patterns", description: "Understanding postpartum bleeding and what's normal" },
        { icon: "😣", title: "Pain Management", description: "Dealing with discomfort during recovery and intimacy" },
        { icon: "💧", title: "Lubrication", description: "Addressing vaginal dryness and using appropriate lubricants" },
        { icon: "🗣️", title: "Partner Communication", description: "Talking openly about physical and emotional needs" },
        { icon: "⏰", title: "Timing Recovery", description: "Individual healing timelines and being patient with process" },
        { icon: "🩺", title: "Medical Clearance", description: "Getting healthcare provider approval before resuming activity" },
        { icon: "💪", title: "Pelvic Floor", description: "Strengthening exercises and pelvic floor rehabilitation" },
        { icon: "🧠", title: "Emotional Readiness", description: "Mental and emotional preparation for intimacy" },
        { icon: "🌟", title: "New Normal", description: "Adjusting expectations and finding what works for you" }
      ],
      "Thyroid Health": [
        { icon: "🔬", title: "Thyroid Function", description: "Understanding how thyroid hormones affect pregnancy and health" },
        { icon: "📊", title: "Testing", description: "When and how often to test thyroid levels during pregnancy" },
        { icon: "💊", title: "Medication Management", description: "Adjusting thyroid medications during pregnancy and breastfeeding" },
        { icon: "⚠️", title: "Hypothyroidism", description: "Managing underactive thyroid during pregnancy" },
        { icon: "⚡", title: "Hyperthyroidism", description: "Dealing with overactive thyroid and pregnancy complications" },
        { icon: "👶", title: "Baby's Health", description: "How maternal thyroid health affects fetal development" },
        { icon: "🍽️", title: "Nutrition", description: "Dietary considerations for thyroid health" },
        { icon: "😴", title: "Symptoms", description: "Recognizing thyroid-related symptoms vs. pregnancy symptoms" },
        { icon: "🏥", title: "Specialist Care", description: "Working with endocrinologists and maternal-fetal medicine" },
        { icon: "📅", title: "Postpartum", description: "Thyroid changes and monitoring after delivery" }
      ],
      "Diabetes": [
        { icon: "📊", title: "Blood Sugar Monitoring", description: "How to check and track blood glucose levels" },
        { icon: "🍎", title: "Diet Management", description: "Meal planning and carb counting for stable blood sugar" },
        { icon: "💉", title: "Insulin Therapy", description: "Types of insulin and injection techniques during pregnancy" },
        { icon: "🏃‍♀️", title: "Exercise", description: "Safe physical activity for managing diabetes in pregnancy" },
        { icon: "⚠️", title: "Complications", description: "Preventing and managing diabetes-related pregnancy complications" },
        { icon: "👶", title: "Baby's Health", description: "How diabetes affects fetal growth and development" },
        { icon: "🏥", title: "Medical Team", description: "Working with endocrinologists, nutritionists, and OB providers" },
        { icon: "📱", title: "Technology", description: "Using glucose monitors and insulin pumps effectively" },
        { icon: "🍼", title: "Gestational Diabetes", description: "Managing diabetes that develops during pregnancy" },
        { icon: "📅", title: "Postpartum Care", description: "Diabetes management after delivery and future risk" }
      ],
      "FGM Support": [
        { icon: "🤝", title: "Understanding FGM", description: "Education about female genital mutilation and its effects" },
        { icon: "🩺", title: "Medical Care", description: "Finding healthcare providers experienced with FGM" },
        { icon: "🤱", title: "Pregnancy Care", description: "Special considerations during pregnancy and delivery" },
        { icon: "💪", title: "Physical Healing", description: "Addressing complications and surgical options" },
        { icon: "🧠", title: "Emotional Support", description: "Trauma-informed counseling and mental health resources" },
        { icon: "🗣️", title: "Speaking Out", description: "Advocacy and sharing your story safely" },
        { icon: "👥", title: "Support Groups", description: "Connecting with other survivors and support networks" },
        { icon: "💖", title: "Intimacy", description: "Addressing sexual health and relationship concerns" },
        { icon: "👶", title: "Protecting Children", description: "Breaking the cycle and protecting future generations" },
        { icon: "🌟", title: "Empowerment", description: "Reclaiming your body and finding strength in survival" }
      ],
      "Hormonal Changes": [
        { icon: "📈", title: "Pregnancy Hormones", description: "Understanding estrogen, progesterone, and hCG changes" },
        { icon: "🤱", title: "Breastfeeding", description: "How prolactin and oxytocin affect mood and body" },
        { icon: "🧠", title: "Mood Fluctuations", description: "Hormonal impacts on mental health and emotions" },
        { icon: "💤", title: "Sleep Patterns", description: "How hormones affect sleep quality and patterns" },
        { icon: "🍽️", title: "Appetite Changes", description: "Hormonal influences on hunger and food cravings" },
        { icon: "💧", title: "Body Changes", description: "Skin, hair, and physical changes from hormonal shifts" },
        { icon: "❤️", title: "Cardiovascular", description: "How hormones affect heart rate and blood pressure" },
        { icon: "⚖️", title: "Weight Management", description: "Hormonal impacts on metabolism and weight" },
        { icon: "🩸", title: "Menstrual Cycle", description: "Return of periods and hormonal regulation postpartum" },
        { icon: "🌟", title: "Balance", description: "Supporting healthy hormone balance naturally" }
      ],
      "Pre-eclampsia": [
        { icon: "🚨", title: "Warning Signs", description: "Recognizing symptoms: headaches, vision changes, swelling" },
        { icon: "💔", title: "Blood Pressure", description: "Understanding hypertension readings and monitoring" },
        { icon: "💧", title: "Protein in Urine", description: "What proteinuria means and testing procedures" },
        { icon: "👶", title: "Fetal Monitoring", description: "How pre-eclampsia affects baby and monitoring needs" },
        { icon: "🏥", title: "Hospital Care", description: "When hospitalization is needed and what to expect" },
        { icon: "💊", title: "Medications", description: "Blood pressure medications safe during pregnancy" },
        { icon: "📅", title: "Delivery Planning", description: "Timing delivery and managing severe pre-eclampsia" },
        { icon: "⚕️", title: "Prevention", description: "Risk factors and strategies to reduce pre-eclampsia risk" },
        { icon: "🔄", title: "Recovery", description: "Postpartum monitoring and blood pressure management" },
        { icon: "📚", title: "Future Pregnancies", description: "Risk in subsequent pregnancies and prevention strategies" }
      ],
      "C-Section Care": [
        { icon: "🏥", title: "Procedure Overview", description: "What to expect during cesarean delivery surgery" },
        { icon: "💊", title: "Pain Management", description: "Managing post-surgical pain safely and effectively" },
        { icon: "🩹", title: "Incision Care", description: "Proper wound care and monitoring for infection" },
        { icon: "🚶‍♀️", title: "Recovery Timeline", description: "Week-by-week recovery expectations and milestones" },
        { icon: "🛁", title: "Activity Restrictions", description: "What activities to avoid and when to resume normal activities" },
        { icon: "⚠️", title: "Warning Signs", description: "Complications to watch for and when to call provider" },
        { icon: "🤱", title: "Breastfeeding", description: "Positioning and strategies for nursing after C-section" },
        { icon: "💪", title: "Core Strengthening", description: "Safe exercises to rebuild abdominal strength" },
        { icon: "🏠", title: "Home Preparation", description: "Setting up your environment for comfortable recovery" },
        { icon: "👶", title: "Future Deliveries", description: "VBAC options and planning future pregnancies" }
      ],
      "Postpartum Depression": [
        { icon: "😢", title: "Recognizing Symptoms", description: "Identifying signs of postpartum depression vs. baby blues" },
        { icon: "🧠", title: "Getting Help", description: "When and where to seek professional mental health support" },
        { icon: "💊", title: "Treatment Options", description: "Therapy, medication, and other treatment approaches" },
        { icon: "🤱", title: "Breastfeeding", description: "Safe antidepressant options while breastfeeding" },
        { icon: "👥", title: "Support Systems", description: "Building networks of family, friends, and professional support" },
        { icon: "💪", title: "Self-Care", description: "Practical self-care strategies during depression" },
        { icon: "👶", title: "Bonding", description: "Building attachment with baby while managing depression" },
        { icon: "🎯", title: "Recovery", description: "Setting realistic expectations for healing and improvement" },
        { icon: "🚨", title: "Crisis Resources", description: "Emergency contacts and crisis intervention resources" },
        { icon: "🌟", title: "Hope", description: "Understanding that postpartum depression is treatable" }
      ]
    };
    
    return contentMap[topicTitle] || [];
  };

  const getSubtopicDetails = (subtopicTitle, mainTopic) => {
    const detailsMap = {
      // Pregnancy Complications subtopics
      "Warning Signs": [
        {
          heading: "Emergency Symptoms",
          content: [
            "• Severe or persistent headaches that don't respond to rest or medication",
            "• Vision changes including blurred vision, seeing spots, or light sensitivity", 
            "• Severe upper abdominal pain, especially under the ribs on the right side",
            "• Sudden swelling of face, hands, or feet, particularly if accompanied by other symptoms",
            "• Decreased fetal movement after 28 weeks - fewer than 10 movements in 2 hours"
          ]
        },
        {
          heading: "When to Call Your Healthcare Provider",
          content: [
            "• Any bleeding during pregnancy, regardless of amount",
            "• Severe nausea and vomiting that prevents keeping food or fluids down",
            "• Signs of infection: fever over 100.4°F, chills, burning during urination",
            "• Contractions before 37 weeks that occur regularly every 10 minutes or less",
            "• Breaking of waters (fluid leaking from vagina) at any stage of pregnancy"
          ],
          islamicNote: "Islam teaches us to seek medical care when needed. The Prophet (PBUH) said: 'Allah has not created a disease without creating a cure for it.' Taking care of your health and your baby's health is a religious obligation."
        }
      ],
      "Bleeding Issues": [
        {
          heading: "Types of Pregnancy Bleeding",
          content: [
            "• Implantation bleeding: Light spotting around 6-12 days after conception, usually brown or pink",
            "• First trimester bleeding: Can indicate miscarriage risk, ectopic pregnancy, or cervical changes",
            "• Second trimester bleeding: May signal placental problems, cervical insufficiency, or preterm labor",
            "• Third trimester bleeding: Often related to placental abruption or placenta previa"
          ]
        },
        {
          heading: "What to Do",
          content: [
            "• Contact your healthcare provider immediately for any bleeding",
            "• Note the color (bright red, brown, pink), amount, and any associated symptoms",
            "• Avoid tampons, douching, or sexual intercourse until cleared by your doctor",
            "• Rest and avoid strenuous activities as advised by your healthcare team"
          ],
          islamicNote: "During times of bleeding or pregnancy complications, Islamic law provides accommodations for prayer and other religious obligations. Consult with a knowledgeable Islamic scholar about your specific situation."
        }
      ],
      "Severe Morning Sickness": [
        {
          heading: "Understanding Hyperemesis Gravidarum",
          content: [
            "• Severe form of morning sickness affecting 1-3% of pregnancies",
            "• Persistent nausea and vomiting that leads to dehydration and weight loss",
            "• Usually begins around 6 weeks and may continue throughout pregnancy",
            "• Can cause electrolyte imbalances and nutritional deficiencies if untreated"
          ]
        },
        {
          heading: "Management Strategies",
          content: [
            "• Eat small, frequent meals every 1-2 hours to keep stomach from becoming empty",
            "• Try bland foods: crackers, toast, rice, bananas, and clear broths",
            "• Stay hydrated with small sips of water, ginger tea, or electrolyte solutions",
            "• Consider vitamin B6 supplements and prescription anti-nausea medications as recommended by your doctor",
            "• Rest in a well-ventilated, cool environment away from strong odors"
          ],
          islamicNote: "If severe nausea prevents you from fasting during Ramadan, Islam allows pregnant women to break their fast and make up the days later. Your health and your baby's health take priority."
        }
      ],
      // Working Moms subtopics
      "Time Management": [
        {
          heading: "Effective Scheduling Strategies",
          content: [
            "• Use time-blocking to dedicate specific hours for work tasks and family activities",
            "• Prepare meals and organize clothes the night before to streamline mornings",
            "• Implement the 'two-minute rule': if a task takes less than two minutes, do it immediately",
            "• Batch similar activities together (meal prep, errands, emails) for efficiency"
          ]
        },
        {
          heading: "Setting Boundaries",
          content: [
            "• Establish clear work hours and communicate them to colleagues and family",
            "• Learn to say no to non-essential commitments that drain your energy",
            "• Delegate household tasks to family members or consider hiring help when possible",
            "• Use technology wisely: set phone boundaries and limit social media during family time"
          ],
          islamicNote: "Islam emphasizes balance in all aspects of life. The Quran states: 'And We made from them leaders guiding by Our command when they were patient and were certain of Our signs.' Patience and proper time management are virtues that help us fulfill our roles as mothers and professionals."
        }
      ],
      "Breastfeeding at Work": [
        {
          heading: "Legal Rights and Workplace Accommodation",
          content: [
            "• Under the PUMP Act, most employers must provide reasonable break time for pumping",
            "• You're entitled to a private space (not a bathroom) for expressing milk",
            "• Discuss your needs with HR before returning to work to establish a pumping schedule",
            "• Know your state laws, as some provide additional protections beyond federal requirements"
          ]
        },
        {
          heading: "Practical Pumping Tips",
          content: [
            "• Pump every 2-3 hours during work hours to maintain milk supply",
            "• Invest in a high-quality double electric pump for efficiency",
            "• Store milk properly: fresh milk can stay at room temperature for 4 hours, refrigerated for 4 days",
            "• Keep extra pump parts at work in case of forgotten pieces or malfunctions",
            "• Consider power pumping sessions in the evening to boost supply if needed"
          ],
          islamicNote: "Breastfeeding is highly recommended in Islam, with the Quran mentioning nursing for two full years if desired. Seeking workplace accommodations to continue this blessed act is supported by Islamic principles of caring for children."
        }
      ],
      // Mental Health subtopics  
      "Postpartum Depression": [
        {
          heading: "Understanding the Difference",
          content: [
            "• Baby blues affect 80% of new mothers: mood swings, crying, anxiety that resolves within 2 weeks",
            "• Postpartum depression affects 10-20% of mothers: persistent sadness, hopelessness, difficulty bonding",
            "• Symptoms include: loss of interest in activities, changes in appetite, sleep problems, feelings of worthlessness",
            "• Can occur anytime within the first year after childbirth, not just immediately after delivery"
          ]
        },
        {
          heading: "Treatment and Support",
          content: [
            "• Professional counseling, including cognitive-behavioral therapy and interpersonal therapy",
            "• Medication options that are safe during breastfeeding, if appropriate",
            "• Support groups connecting you with other mothers experiencing similar challenges",
            "• Lifestyle changes: regular exercise, adequate sleep, nutritious diet, and stress reduction",
            "• Don't hesitate to ask for help with baby care and household tasks"
          ],
          islamicNote: "Mental health is as important as physical health in Islam. Seeking treatment for depression is not a sign of weak faith but rather taking care of the trust (amanah) Allah has given you. The Prophet (PBUH) emphasized the importance of caring for one's health."
        }
      ],
      "Anxiety Management": [
        {
          heading: "Common Pregnancy and Parenting Anxieties",
          content: [
            "• Fear about baby's health and development during pregnancy and after birth",
            "• Worries about being a good parent and making the right decisions",
            "• Concerns about finances, career changes, and family dynamics",
            "• Anxiety about childbirth, pain management, and medical procedures"
          ]
        },
        {
          heading: "Coping Strategies",
          content: [
            "• Practice deep breathing exercises and progressive muscle relaxation",
            "• Limit exposure to negative birth stories and excessive pregnancy information",
            "• Maintain regular exercise appropriate for your pregnancy stage",
            "• Journal your thoughts and feelings to identify anxiety triggers",
            "• Build a strong support network of family, friends, and healthcare providers"
          ],
          islamicNote: "The Quran teaches us: 'And whoever relies upon Allah - then He is sufficient for him. Indeed, Allah will accomplish His purpose.' Trust in Allah's plan while taking practical steps to manage anxiety through proper care and support."
        }
      ],
      // Sexual Health subtopics
      "Intimacy During Pregnancy": [
        {
          heading: "Safety and Comfort Guidelines",
          content: [
            "• Sex is generally safe during a normal pregnancy unless your doctor advises otherwise",
            "• Communicate openly with your partner about comfort levels and any concerns",
            "• Experiment with different positions as your body changes, especially side-lying positions",
            "• It's normal for libido to fluctuate throughout pregnancy due to hormonal changes"
          ]
        },
        {
          heading: "When to Avoid Sexual Activity",
          content: [
            "• History of preterm labor or risk factors for preterm delivery",
            "• Placenta previa or unexplained vaginal bleeding",
            "• Cervical insufficiency or cerclage placement",
            "• Multiple pregnancy (twins, triplets) in the third trimester",
            "• Your healthcare provider has specifically advised against it"
          ],
          islamicNote: "Islam encourages intimacy between spouses as a source of comfort and bonding. During pregnancy, maintaining emotional and physical connection within safe boundaries strengthens the marital relationship and family foundation."
        }
      ],
      "Postpartum Recovery": [
        {
          heading: "Physical Healing Timeline",
          content: [
            "• Wait for your healthcare provider's clearance, typically 4-6 weeks after delivery",
            "• Vaginal delivery: tissues need time to heal, especially if there were tears or episiotomy",
            "• C-section delivery: abdominal incision requires additional healing time",
            "• Lochia (postpartum bleeding) should have stopped or significantly decreased"
          ]
        },
        {
          heading: "Emotional and Physical Readiness",
          content: [
            "• Don't rush into intimacy; emotional readiness is as important as physical healing",
            "• Communicate with your partner about fears, expectations, and comfort levels",
            "• Use adequate lubrication as hormonal changes can cause vaginal dryness",
            "• Start slowly and be patient with yourself as sensation and comfort return gradually",
            "• Consider counseling if you experience pain, fear, or relationship difficulties"
          ],
          islamicNote: "Islam emphasizes patience and gradual return to normal activities after childbirth. The period of nifas (postpartum) is recognized as a time of recovery and adjustment for new mothers."
        }
      ],
      // Continue with other subtopics...
      "Thyroid Function": [
        {
          heading: "Thyroid Changes During Pregnancy",
          content: [
            "• Thyroid hormone needs increase by 30-50% during pregnancy",
            "• Human chorionic gonadotropin (hCG) can stimulate thyroid activity in early pregnancy",
            "• Changes in thyroid-binding proteins affect hormone levels",
            "• Pre-existing thyroid conditions require close monitoring and medication adjustments"
          ]
        },
        {
          heading: "Monitoring and Management",
          content: [
            "• Regular blood tests to check TSH, T3, and T4 levels throughout pregnancy",
            "• Medication adjustments based on trimester-specific reference ranges",
            "• Coordination between endocrinologist and obstetrician for optimal care",
            "• Postpartum monitoring as thyroid needs change again after delivery"
          ],
          islamicNote: "Taking prescribed thyroid medication during pregnancy is essential for both mother and baby's health. Islam supports seeking medical treatment and following healthcare guidance to protect the lives entrusted to our care."
        }
      ]
    };

    return detailsMap[subtopicTitle] || [
      {
        heading: "Information",
        content: [
          "Detailed information about this topic is being compiled. Please consult with your healthcare provider for specific guidance.",
          "This is an important aspect of women's health that deserves careful attention and professional medical advice."
        ],
        islamicNote: "Islam encourages seeking knowledge about health and taking care of our bodies as they are trusts from Allah. Consult healthcare professionals and Islamic scholars for guidance when needed."
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

    // <Card className="mb-6">
    //   <CardHeader>
    //     <CardTitle className="flex items-center gap-2">
    //       <Droplets className="w-5 h-5 text-lavender-600" />
    //       {title}
    //     </CardTitle>
    //   </CardHeader>
    //   <CardContent>
    //     <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
    //       {types.map((type) => (
    //         <Card 
    //           key={type.id}
    //           className={`cursor-pointer hover:shadow-md transition-all duration-300 ${type.color}`}
    //           onClick={() => setExpandedType(expandedType === type.id ? null : type.id)}
    //         >
    //           <CardContent className="p-3 text-center">
    //             <div className="flex items-center justify-between mb-2">
    //               <span className="text-xl">{type.icon}</span>
    //               {getStatusIcon(type.status)}
    //             </div>
    //             <h4 className={`font-semibold text-xs ${type.textColor} mb-1`}>
    //               {type.title}
    //             </h4>
    //             <p className={`text-xs ${type.textColor} opacity-75`}>
    //               {type.brief}
    //             </p>
    //           </CardContent>
    //         </Card>
    //       ))}
    //     </div>

    //     {expandedType && (
    //       <Card className="mt-4 bg-lavender-50 border-lavender-200">
    //         <CardContent className="p-4">
    //           <div className="flex items-center gap-2 mb-3">
    //             <span className="text-2xl">{types.find(t => t.id === expandedType)?.icon}</span>
    //             <h4 className="font-semibold text-lavender-800">
    //               {types.find(t => t.id === expandedType)?.title}
    //             </h4>
    //             {getStatusIcon(types.find(t => t.id === expandedType)?.status)}
    //           </div>
    //           <p className="text-lavender-700 text-sm leading-relaxed">
    //             {types.find(t => t.id === expandedType)?.detailed}
    //           </p>
    //         </CardContent>
    //       </Card>
    //     )}
    //   </CardContent>
    // </Card>

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
    // <Card className="mb-6">
    //   <CardHeader>
    //     <CardTitle className="flex items-center gap-2">
    //       {titleIcon}
    //       {title}
    //     </CardTitle>
    //   </CardHeader>
    //   <CardContent>
    //     <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
    //       {topics.map((topic) => (
    //         <Card 
    //           key={topic.id}
    //           className="cursor-pointer hover:shadow-md transition-all duration-300 border-lavender-200 hover:bg-lavender-50"
    //           onClick={() => setExpandedTopic(expandedTopic === topic.id ? null : topic.id)}
    //         >
    //           <CardContent className="p-4">
    //             <div className="flex items-center justify-between mb-2">
    //               <div className="flex items-center gap-2">
    //                 <span className="text-lg">{topic.icon}</span>
    //                 <h4 className="font-semibold text-sm text-gray-800">
    //                   {topic.title}
    //                 </h4>
    //               </div>
    //               <div className="flex items-center gap-1">
    //                 {getStatusIcon(topic.status)}
    //                 {expandedTopic === topic.id ? 
    //                   <ChevronUp className="w-4 h-4 text-lavender-600" /> : 
    //                   <ChevronDown className="w-4 h-4 text-lavender-600" />
    //                 }
    //               </div>
    //             </div>
    //             <p className="text-xs text-gray-600 mb-2">
    //               {topic.brief}
    //             </p>
    //           </CardContent>
    //         </Card>
    //       ))}
    //     </div>

    //     {expandedTopic && (
    //       <Card className="mt-4 bg-lavender-50 border-lavender-200">
    //         <CardContent className="p-4">
    //           <div className="flex items-center gap-2 mb-3">
    //             <span className="text-2xl">{topics.find(t => t.id === expandedTopic)?.icon}</span>
    //             <h4 className="font-semibold text-lavender-800">
    //               {topics.find(t => t.id === expandedTopic)?.title}
    //             </h4>
    //             {getStatusIcon(topics.find(t => t.id === expandedTopic)?.status)}
    //           </div>
    //           <p className="text-lavender-700 text-sm leading-relaxed">
    //             {topics.find(t => t.id === expandedTopic)?.detailed}
    //           </p>
    //         </CardContent>
    //       </Card>
    //     )}
    //   </CardContent>
    // </Card>

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
      title: "Vaginal Discharge Guide",
      description: "Comprehensive guide to understanding different types of vaginal discharge, what they mean for your health, and when to seek medical attention.",
      icons: ["⚪", "🟡", "🧀", "💧"],
      coverage: "8 Types Covered",
      color: "from-blue-500 to-blue-600",
      component: <ColorChart 
        types={dischargeTypes} 
        expandedType={expandedDischarge} 
        setExpandedType={setExpandedDischarge}
        title="Vaginal Discharge Color Chart"
      />
    },
    {
      title: "Period Blood Color Guide", 
      description: "Learn about different period blood colors, their meanings, and Islamic rulings regarding menstruation (hayd) vs. non-menstrual bleeding (istihādah).",
      icons: ["🔴", "🟤", "🟫", "🌸"],
      coverage: "7 Colors Explained",
      color: "from-red-500 to-red-600",
      component: <ColorChart 
        types={bloodTypes} 
        expandedType={expandedBlood} 
        setExpandedType={setExpandedBlood}
        title="Period Blood Color Chart"
      />
    },
    {
      title: "Early Signs of Pregnancy",
      description: "Comprehensive guide to early pregnancy symptoms, when to test, and how to handle the emotional journey with Islamic guidance and support.",
      icons: ["🤰", "🧪", "💭", "💕"],
      coverage: "10 Topics Covered",
      color: "from-pink-500 to-pink-600",
      component: <TopicChart 
        topics={pregnancySigns} 
        expandedTopic={expandedPregnancy} 
        setExpandedTopic={setExpandedPregnancy}
        title="Early Pregnancy Signs"
        titleIcon={<Baby className="w-5 h-5 text-lavender-600" />}
      />
    }
  ];

  const healthConditions = [
    {
      title: "PCOS Support & Awareness",
      description: "Living with PCOS: Understanding symptoms, managing naturally, and finding confidence with faith-based support and medical guidance.",
      icons: ["🌀", "💪", "🌱", "🤲"],
      coverage: "10 Topics",
      color: "from-purple-500 to-purple-600",
      component: <TopicChart 
        topics={pcosTopics} 
        expandedTopic={expandedPCOS} 
        setExpandedTopic={setExpandedPCOS}
        title="PCOS Support & Management"
        titleIcon={<Flower className="w-5 h-5 text-lavender-600" />}
      />
    },
    {
      title: "Endometriosis Support",
      description: "Understanding endometriosis: pain management, emotional support, and spiritual strength for navigating this challenging condition.",
      icons: ["🌙", "💙", "🛡️", "🤲"],
      coverage: "10 Topics",
      color: "from-indigo-500 to-indigo-600",
      component: <TopicChart 
        topics={endometriosisTopics} 
        expandedTopic={expandedEndometriosis} 
        setExpandedTopic={setExpandedEndometriosis}
        title="Endometriosis Support"
        titleIcon={<Shield className="w-5 h-5 text-lavender-600" />}
      />
    }
  ];

  const periodManagement = [
    {
      title: "What Makes Cramps Worse",
      description: "Understanding triggers that worsen period pain and how to avoid them for better menstrual comfort.",
      icons: ["☕", "😰", "🍰", "💧"],
      coverage: "10 Triggers",
      color: "from-orange-500 to-orange-600",
      component: <TopicChart 
        topics={crampTriggers} 
        expandedTopic={expandedCrampTriggers} 
        setExpandedTopic={setExpandedCrampTriggers}
        title="Cramp Triggers to Avoid"
        titleIcon={<AlertCircle className="w-5 h-5 text-lavender-600" />}
      />
    },
    {
      title: "Why Periods Are Late",
      description: "Non-pregnancy causes of delayed menstruation: stress, hormones, health conditions, and lifestyle factors.",
      icons: ["⏰", "😰", "⚖️", "🩺"],
      coverage: "10 Causes",
      color: "from-yellow-500 to-yellow-600",
      component: <TopicChart 
        topics={latePeriodsReasons} 
        expandedTopic={expandedLatePeriods} 
        setExpandedTopic={setExpandedLatePeriods}
        title="Common Causes of Late Periods"
        titleIcon={<Clock className="w-5 h-5 text-lavender-600" />}
      />
    },
    {
      title: "Period Length Changes",
      description: "Why periods might be shorter or longer than usual: hormones, birth control, health conditions, and when to see a doctor.",
      icons: ["📅", "⬆️", "⬇️", "🩺"],
      coverage: "10 Topics",
      color: "from-green-500 to-green-600",
      component: <TopicChart 
        topics={periodLengthFactors} 
        expandedTopic={expandedPeriodLength} 
        setExpandedTopic={setExpandedPeriodLength}
        title="Understanding Period Length Changes"
        titleIcon={<Calendar className="w-5 h-5 text-lavender-600" />}
      />
    }
  ];

  const familyPlanning = [
    {
      title: "Pregnancy & Health Topics",
      description: "Comprehensive health topics covering pregnancy complications, mental health, working mothers, maternal care, and women's health conditions.",
      icons: ["🤰", "🧠", "👩🏽‍💼", "🏥"],
      coverage: "17 Topics",
      color: "from-rose-500 to-rose-600",
      component: <TopicChart 
        topics={pregnancyHealthTopics} 
        expandedTopic={expandedPregnancy} 
        setExpandedTopic={setExpandedPregnancy}
        title="Pregnancy & Women's Health Topics"
        titleIcon={<Heart className="w-5 h-5 text-lavender-600" />}
      />
    },
    {
      title: "Contraception & Family Planning",
      description: "Understanding birth control options with Islamic guidance: methods, effectiveness, side effects, and family planning wisdom.",
      icons: ["🛡️", "💊", "🌙", "👥"],
      coverage: "10 Topics",
      color: "from-teal-500 to-teal-600",
      component: <TopicChart 
        topics={contraceptionTopics} 
        expandedTopic={expandedContraception} 
        setExpandedTopic={setExpandedContraception}
        title="Family Planning & Contraception"
        titleIcon={<Target className="w-5 h-5 text-lavender-600" />}
      />
    },
    {
      title: "Natural Cramp Remedies",
      description: "Evidence-based home remedies for period pain: heat therapy, herbs, Sunnah remedies, and natural comfort measures.",
      icons: ["🔥", "🫖", "🌿", "🍯"],
      coverage: "10 Remedies",
      color: "from-emerald-500 to-emerald-600",
      component: <TopicChart 
        topics={naturalRemedies} 
        expandedTopic={expandedRemedies} 
        setExpandedTopic={setExpandedRemedies}
        title="Natural Pain Relief Methods"
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

  const GuideCard = ({ guide, sectionKey }: { guide: any; sectionKey: string }) => {
    const isOpen = openSections[sectionKey] || false;
    
    return (
    // <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer card-3d">
    //   <CardContent className="p-4">
    //     <div className="flex items-start gap-3 mb-3">
    //       <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${guide.color} flex items-center justify-center text-white text-xs font-bold circular-3d`}>
    //         {guide.icons[0]}
    //       </div>
    //       <div className="flex-1">
    //         <h3 className="font-semibold text-gray-800 mb-1">{guide.title}</h3>
    //         <div className="flex gap-1 mb-2">
    //           {guide.icons.map((icon: string, index: number) => (
    //             <span key={index} className="text-sm">{icon}</span>
    //           ))}
    //           <span className="text-xs text-lavender-600 font-medium ml-1">{guide.coverage}</span>
    //         </div>
    //       </div>
    //     </div>
    //     <p className="text-gray-600 text-sm leading-relaxed mb-3">{guide.description}</p>
        
    //     {/* Show interactive content */}
    //     {guide.component && (
    //       <div className="mt-4">
    //         {guide.component}
    //       </div>
    //     )}
    //   </CardContent>
    // </Card>

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

      {/* <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Health Insights</h1>
        <p className="text-gray-600">Comprehensive health guidance for informed decisions</p>
      </div> */}

      <div className={`text-center ${settings.darkMode ? 'text-white' : ''}`}>
  <h1 className={`text-3xl font-bold mb-2 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>
    Health Insights
  </h1>
  <p className={`${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
    Comprehensive health guidance for informed decisions
  </p>
</div>

      {/* Health Scores */}
      
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="card-3d">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-800">Cycle Regularity</h3>
                <p className="text-sm text-gray-600">Your cycles are very regular</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-lavender-600">92%</span>
              </div>
            </div>
            <Progress value={92} className="h-2" />
          </CardContent>
        </Card>

        <Card className="card-3d">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">Overall Health Score</h3>
                <p className="text-sm text-gray-600">Based on tracking patterns</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-green-600">Excellent</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <Card className="relative overflow-hidden card-3d">
    <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white border border-gray-200'}`}></div>
    <CardContent className="p-4 relative z-10">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className={`font-semibold ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>Cycle Regularity</h3>
          <p className={`text-sm ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Your cycles are very regular</p>
        </div>
        <div className="text-right">
          <span className={`text-2xl font-bold ${settings.darkMode ? 'text-lavender-400' : 'text-lavender-600'}`}>92%</span>
        </div>
      </div>
      <Progress value={92} className="h-2" />
    </CardContent>
  </Card>

  <Card className="relative overflow-hidden card-3d">
    <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white border border-gray-200'}`}></div>
    <CardContent className="p-4 relative z-10">
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`font-semibold ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>Overall Health Score</h3>
          <p className={`text-sm ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Based on tracking patterns</p>
        </div>
        <div className="text-right">
          <span className={`text-lg font-bold ${settings.darkMode ? 'text-green-400' : 'text-green-600'}`}>Excellent</span>
        </div>
      </div>
    </CardContent>
  </Card>
</div>


      {/* Educational Health Guides */}
      <div>
        {/* <h2 className="text-xl font-bold text-gray-800 mb-4">Educational Health Guides</h2>
         */}

         <h2 className={`text-xl font-bold mb-4 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>Educational Health Guides</h2>
        <div className="grid grid-cols-1 gap-4">
          {educationalGuides.map((guide, index) => (
            <GuideCard key={index} guide={guide} sectionKey={`educational-${index}`} />
          ))}
        </div>
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
                Back
              </Button>
              <h2 className={`text-xl font-bold ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>
                {selectedSubtopic.title}
              </h2>
            </div>
            
            <Card className={`card-3d ${settings.darkMode ? 'bg-slate-800 border-slate-600' : 'bg-white'}`}>
              <CardContent className="p-6">
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
                        <div className={`mt-4 p-4 rounded-lg ${settings.darkMode ? 'bg-slate-700 border-slate-600' : 'bg-purple-50 border border-purple-200'}`}>
                          <h4 className={`text-sm font-semibold mb-2 ${settings.darkMode ? 'text-purple-300' : 'text-purple-700'}`}>
                            🕌 Islamic Perspective
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
                Back to Topics
              </Button>
              <h2 className={`text-xl font-bold ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>
                {selectedTopic.title}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getTopicContent(selectedTopic.title).map((item, index) => (
                <Card 
                  key={index} 
                  className={`card-3d cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 ${settings.darkMode ? 'bg-slate-800 border-slate-600' : 'bg-white'}`}
                  onClick={() => setSelectedSubtopic(item)}
                >
                  <CardContent className="p-4">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${selectedTopic.color} flex items-center justify-center text-white text-sm mb-3`}>
                      {item.icon}
                    </div>
                    <h3 className={`font-semibold text-sm ${settings.darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>
                      {item.title}
                    </h3>
                    <p className={`text-xs ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h2 className={`text-xl font-bold mb-4 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>
              Pregnancy & Women's Health Topics
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                {
                  title: "Pregnancy Complications",
                  icon: "⚠️",
                  description: "Understanding risks and warning signs",
                  color: "from-red-500 to-red-600"
                },
                {
                  title: "Pregnancy Loss",
                  icon: "💜",
                  description: "Support during difficult times",
                  color: "from-purple-500 to-purple-600"
                },
                {
                  title: "Working Moms",
                  icon: "👩🏽‍💼",
                  description: "Balancing career and motherhood",
                  color: "from-blue-500 to-blue-600"
                },
                {
                  title: "Sleep & Eating",
                  icon: "🍎",
                  description: "Managing nutrition and rest",
                  color: "from-green-500 to-green-600"
                },
                {
                  title: "Mental Health",
                  icon: "🧠",
                  description: "Supporting emotional wellbeing",
                  color: "from-indigo-500 to-indigo-600"
                },
                {
                  title: "Contraception",
                  icon: "💊",
                  description: "Family planning guidance",
                  color: "from-pink-500 to-pink-600"
                },
                {
                  title: "Birthing While Black",
                  icon: "🛡️",
                  description: "Addressing health disparities",
                  color: "from-amber-500 to-amber-600"
                },
                {
                  title: "Marriage & New Baby",
                  icon: "👶🏽",
                  description: "Relationship changes",
                  color: "from-rose-500 to-rose-600"
                },
                {
                  title: "Sexual Health",
                  icon: "💖",
                  description: "Intimate wellness education",
                  color: "from-teal-500 to-teal-600"
                },
                {
                  title: "After Birth",
                  icon: "🤱🏽",
                  description: "Postpartum recovery care",
                  color: "from-emerald-500 to-emerald-600"
                },
                {
                  title: "Intimacy & Bleeding",
                  icon: "🩸",
                  description: "Changes after childbirth",
                  color: "from-red-400 to-red-500"
                },
                {
                  title: "Thyroid Health",
                  icon: "🔬",
                  description: "Managing thyroid conditions",
                  color: "from-cyan-500 to-cyan-600"
                },
                {
                  title: "Diabetes",
                  icon: "📊",
                  description: "Blood sugar management",
                  color: "from-orange-500 to-orange-600"
                },
                {
                  title: "FGM Support",
                  icon: "🤝",
                  description: "Healing and support resources",
                  color: "from-violet-500 to-violet-600"
                },
                {
                  title: "Hormonal Changes",
                  icon: "📈",
                  description: "Understanding body transitions",
                  color: "from-yellow-500 to-yellow-600"
                },
                {
                  title: "Pre-eclampsia",
                  icon: "🚨",
                  description: "Recognition and management",
                  color: "from-red-600 to-red-700"
                },
                {
                  title: "C-Section Care",
                  icon: "🏥",
                  description: "Recovery and wound care",
                  color: "from-blue-600 to-blue-700"
                },
                {
                  title: "Postpartum Depression",
                  icon: "😢",
                  description: "Mental health after birth",
                  color: "from-slate-500 to-slate-600"
                }
              ].map((topic, index) => (
                <Card 
                  key={index} 
                  className="relative overflow-hidden card-3d cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
                  onClick={() => setSelectedTopic(topic)}
                >
                  <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-800 border border-slate-600' : 'bg-gradient-to-br ' + topic.color + ' opacity-10'}`}></div>
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
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Understanding Health Conditions */}
      <div>
        {/* <h2 className="text-xl font-bold text-gray-800 mb-4">Understanding Health Conditions</h2>
         */}
         <h2 className={`text-xl font-bold mb-4 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>
  Understanding Health Conditions
</h2>
         <div className="grid grid-cols-1 gap-4">
           {healthConditions.map((guide, index) => (
             <GuideCard key={index} guide={guide} sectionKey={`health-${index}`} />
           ))}
         </div>
      </div>

      {/* Period Management & Understanding */}
      <div>
        {/* <h2 className="text-xl font-bold text-gray-800 mb-4">Period Management & Understanding</h2>
         */}
         <h2 className={`text-xl font-bold mb-4 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>
  Period Management & Understanding
</h2>

         <div className="grid grid-cols-1 gap-4">
           {periodManagement.map((guide, index) => (
             <GuideCard key={index} guide={guide} sectionKey={`period-${index}`} />
           ))}
         </div>
      </div>

      {/* Family Planning & Natural Remedies */}
      <div>
        {/* <h2 className="text-xl font-bold text-gray-800 mb-1">Family Planning & Natural Remedies</h2>
         */}
         <h2 className={`text-xl font-bold mb-1 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>
  Family Planning & Natural Remedies
</h2>

         <div className="grid grid-cols-1 gap-4">
           {familyPlanning.map((guide, index) => (
             <GuideCard key={index} guide={guide} sectionKey={`family-${index}`} />
           ))}
         </div>
      </div>

      {/* Cycle Patterns */}
      {/* <Card className="bg-gradient-to-br from-lavender-50 to-lavender-100 border-lavender-200 card-3d">
        <CardHeader>
          <CardTitle className="text-lavender-800">Cycle Patterns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm text-lavender-600 mb-1">Average Length:</p>
              <p className="text-lg font-bold text-lavender-800">28 days</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-lavender-600 mb-1">Period Duration:</p>
              <p className="text-lg font-bold text-lavender-800">5 days</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-lavender-600 mb-1">Regularity:</p>
              <p className="text-lg font-bold text-lavender-800">High</p>
            </div>
          </div>
        </CardContent>
      </Card> */}

      {/* <Card className={`relative overflow-hidden card-3d ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-gradient-to-br from-lavender-50 to-lavender-100 border-lavender-200'}`}>
  <CardHeader>
    <CardTitle className={`${settings.darkMode ? 'text-white' : 'text-lavender-800'}`}>
      Cycle Patterns
    </CardTitle>
  </CardHeader>
  <CardContent>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div className="text-center">
        <p className={`${settings.darkMode ? 'text-gray-400' : 'text-lavender-600'} text-sm mb-1`}>Average Length:</p>
        <p className={`${settings.darkMode ? 'text-white' : 'text-lavender-800'} text-lg font-bold`}>28 days</p>
      </div>
      <div className="text-center">
        <p className={`${settings.darkMode ? 'text-gray-400' : 'text-lavender-600'} text-sm mb-1`}>Period Duration:</p>
        <p className={`${settings.darkMode ? 'text-white' : 'text-lavender-800'} text-lg font-bold`}>5 days</p>
      </div>
      <div className="text-center">
        <p className={`${settings.darkMode ? 'text-gray-400' : 'text-lavender-600'} text-sm mb-1`}>Regularity:</p>
        <p className={`${settings.darkMode ? 'text-white' : 'text-lavender-800'} text-lg font-bold`}>High</p>
      </div>
    </div>
  </CardContent>
</Card> */}

<Card className="relative overflow-hidden card-3d">
  <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : ' from-lavender-50 to-lavender-100 border-lavender-200'}`}></div>

  <CardHeader className="relative z-10">
    <CardTitle className={`text-xl font-bold ${settings.darkMode ? 'text-white' : 'text-lavender-800'}`}>
      Cycle Patterns
    </CardTitle>
  </CardHeader>

  <CardContent className="relative z-10">
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div className="text-center">
        <p className={`text-sm mb-1 ${settings.darkMode ? 'text-gray-400' : 'text-lavender-600'}`}>Average Length:</p>
        <p className={`text-lg font-bold ${settings.darkMode ? 'text-white' : 'text-lavender-800'}`}>28 days</p>
      </div>
      <div className="text-center">
        <p className={`text-sm mb-1 ${settings.darkMode ? 'text-gray-400' : 'text-lavender-600'}`}>Period Duration:</p>
        <p className={`text-lg font-bold ${settings.darkMode ? 'text-white' : 'text-lavender-800'}`}>5 days</p>
      </div>
      <div className="text-center">
        <p className={`text-sm mb-1 ${settings.darkMode ? 'text-gray-400' : 'text-lavender-600'}`}>Regularity:</p>
        <p className={`text-lg font-bold ${settings.darkMode ? 'text-white' : 'text-lavender-800'}`}>High</p>
      </div>
    </div>
  </CardContent>
</Card>



      {/* Health Reminders & Islamic Wellness */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 card-3d">
          <CardHeader>
            <CardTitle className="text-blue-800 flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Health Reminders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-blue-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Stay hydrated during your cycle</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Maintain proper hygiene practices</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Track any unusual symptoms</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Consult healthcare providers when needed</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 card-3d">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <Moon className="w-5 h-5" />
              Islamic Wellness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-green-700">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Understanding your body is Sunnah</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Seek knowledge about health</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Maintain spiritual and physical purity</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Trust in Allah's wisdom</span>
              </li>
            </ul>
          </CardContent>
        </Card> */}

          <Card className="relative overflow-hidden card-3d">
  <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : ' from-blue-50 to-blue-100 border-blue-200'}`}></div>
  
  <CardHeader className="relative z-10">
    <CardTitle className={`flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-blue-800'}`}>
      <Heart className="w-5 h-5" />
      Health Reminders
    </CardTitle>
  </CardHeader>

  <CardContent className="relative z-10">
    <ul className={`space-y-2 text-sm ${settings.darkMode ? 'text-gray-300' : 'text-blue-700'}`}>
      {['Stay hydrated during your cycle', 'Maintain proper hygiene practices', 'Track any unusual symptoms', 'Consult healthcare providers when needed'].map((text, index) => (
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
      Islamic Wellness
    </CardTitle>
  </CardHeader>

  <CardContent className="relative z-10">
    <ul className={`space-y-2 text-sm ${settings.darkMode ? 'text-gray-300' : 'text-green-700'}`}>
      {['Understanding your body is Sunnah', 'Seek knowledge about health', 'Maintain spiritual and physical purity', 'Trust in Allah\'s wisdom'].map((text, index) => (
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
      {/* <Card className="bg-gradient-to-r from-lavender-600 via-lavender-500 to-lavender-800 relative overflow-hidden card-3d">
        <div className="absolute inset-0 opacity-20">
          <div className="animate-pulse absolute top-0 right-0 w-16 h-16 bg-lavender-300 rounded-full"></div>
          <div className="animate-pulse absolute bottom-0 left-0 w-12 h-12 bg-lavender-400 rounded-full animation-delay-700"></div>
        </div>
        <CardContent className="p-6 text-center relative z-10">
          <h2 className="text-xl font-bold mb-4 text-lavender-800">Islamic Health Wisdom</h2>
          <p className="text-base text-purple-900  mb-2">
            "Allah has not created a disease without creating a cure for it, except for one disease: old age."
          </p>
          <p className="text-sm text-gray-299 opacity-75 text-purple-900  mb-4">- Sahih Bukhari 5678</p>
          <p className="text-sm text-gray-299 opacity-80 text-purple-900 ">
            Seeking knowledge about our health and bodies is part of the wisdom Allah has given us.
          </p>
        </CardContent>
      </Card> */}

   <Card className="relative overflow-hidden card-3d">
  <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : ' from-lavender-600 via-lavender-500 to-lavender-800 border-lavender-200'}`}></div>

  <div className={`absolute inset-0 ${settings.darkMode ? 'hidden' : 'opacity-20'}`}>
    <div className="animate-pulse absolute top-0 right-0 w-16 h-16 bg-lavender-300 rounded-full"></div>
    <div className="animate-pulse absolute bottom-0 left-0 w-12 h-12 bg-lavender-400 rounded-full animation-delay-700"></div>
  </div>

  <CardContent className="p-6 text-center relative z-10">
    <h2 className={`text-xl font-bold mb-4 ${settings.darkMode ? 'text-white' : 'text-lavender-800'}`}>
      Islamic Health Wisdom
    </h2>
    <p className={`text-base mb-2 ${settings.darkMode ? 'text-gray-300' : 'text-purple-900'}`}>
      "Allah has not created a disease without creating a cure for it, except for one disease: old age."
    </p>
    <p className={`text-sm opacity-75 mb-4 ${settings.darkMode ? 'text-gray-400' : 'text-purple-900'}`}>
      - Sahih Bukhari 5678
    </p>
    <p className={`text-sm opacity-80 ${settings.darkMode ? 'text-gray-400' : 'text-purple-900'}`}>
      Seeking knowledge about our health and bodies is part of the wisdom Allah has given us.
    </p>
  </CardContent>
</Card>


    </div>
  );
};

export default HealthInsights;
