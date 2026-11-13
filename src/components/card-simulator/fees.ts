export default [
	{
		name: "Mastercard/Visa",
		fees: {
			debit: 0.0145,
			credit: [
				{ installments: 1, interest: 0.03317 },
				{ installments: 2, interest: 0.05297 },
				{ installments: 3, interest: 0.06034 },
				{ installments: 4, interest: 0.0677 },
				{ installments: 5, interest: 0.07516 },
				{ installments: 6, interest: 0.08273 },
				{ installments: 7, interest: 0.09674 },
				{ installments: 8, interest: 0.10437 },
				{ installments: 9, interest: 0.11211 },
				{ installments: 10, interest: 0.11983 },
				{ installments: 11, interest: 0.12765 },
				{ installments: 12, interest: 0.13547 },

				{ installments: 15, interest: 0.15902 },
				{ installments: 18, interest: 0.18302 },
			],
		},
	},
	{
		name: "Demais Bandeiras",
		fees: {
			debit: 0.0151,
			credit: [
				{ installments: 1, interest: 0.03627 },
				{ installments: 2, interest: 0.05463 },
				{ installments: 3, interest: 0.06203 },
				{ installments: 4, interest: 0.06941 },
				{ installments: 5, interest: 0.07689 },
				{ installments: 6, interest: 0.08449 },
				{ installments: 7, interest: 0.10035 },
				{ installments: 8, interest: 0.10804 },
				{ installments: 9, interest: 0.11583 },
				{ installments: 10, interest: 0.1236 },
				{ installments: 11, interest: 0.13148 },
				{ installments: 12, interest: 0.13935 },
				{ installments: 15, interest: 0.16306 },
				{ installments: 18, interest: 0.18722 },
			],
		},
	},
];
