import { CCNL } from 'entities/ccnl';
import { SalaryTable } from 'entities/salaryTable';
import { BaseManager } from './baseManager';

export class CCNLManager extends BaseManager {
	/**
	 * Creates a new {PersonManager}.
	 * @param {User} user The user.
	 */
	constructor(user) {
		super(user);

	}

	/**
	 * Gets a list of CCNL
	 * @param {boolean} withSalaryTable Include salary table in results.
	 * @param {string} filter Text search string.
	 * @param {number} page Page number.
	 * @param {number} pageLimit Number of element per page.
	 */
	async getAsync(withSalaryTable, filter, page, pageLimit) {
		page = page || 0;
		pageLimit = pageLimit || 10;

		return await super.getAsync(CCNL, 'ccnl', page, pageLimit, (queryBuilder) => {
			if (filter)
				queryBuilder
					.where('ccnl.name like :filter', { filter: `%${filter}%` });
			
			if (withSalaryTable)
				queryBuilder
					.innerJoinAndSelect('ccnl.salaryTable', 'salary_table');

			return queryBuilder;
		});
	}

	/**
	 * Gets a list of levels for the given CCNL.
	 * @param {number} ccnlId The CCNL id.
	 * @param {string} filter Text search string.
	 * @param {number} page Page number.
	 * @param {number} pageLimit Number of element per page.
	 */
	async getLevelsAsync(ccnlId, filter, page, pageLimit) {
		page = page || 0;
		pageLimit = pageLimit || 10;

		return await super.getAsync(SalaryTable, 'salary_table', page, pageLimit, (queryBuilder) => {
			queryBuilder
				.innerJoinAndSelect('salary_table.ccnl', 'ccnl', 'ccnl.id = :id', { id: ccnlId });

			if (filter)
				queryBuilder
					.andWhere('salary_table.level like :filter', { filter: `%${filter}%` });
			
			return queryBuilder;
		});
	}

	/**
	 * Gets a CCNL by id.
	 * @param {number} id The CCNL id.
	 * @param {boolean} withSalaryTable Include salary table in results.
	 */
	async getByIdAsync(id, withSalaryTable) {
		return await super.getByIdAsync(CCNL, 'ccnl', id, (queryBuilder) => {
			if (withSalaryTable)
				queryBuilder
					.innerJoinAndSelect('ccnl.salaryTable', 'salary-table');
		});
	}
}
