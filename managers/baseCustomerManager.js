import { BaseManager } from './baseManager';
import { SelectQueryBuilder } from 'typeorm';

export class BaseCustomerManager extends BaseManager {
	/**
	 * @type {Customer}
	 */
	customer;

	/**
	 * Creates a new {BaseCustomerManager}.
	 * @param {Customer} customer the Customer.
	 */
	constructor(customer) {
		super();
		if (!customer)
			throw 'Customer is not defined';

		this.customer = customer;
	}

	getCustomer() {
		return this.customer;
	}

	/**
	 * Saves the entity.
	 * @param {string} target The target entity.
	 * @param {CustomerSpecific} entity The entity to save.
	 */
	async saveAsync(target, entity) {
		entity.customer = this.customer;
		await super.saveAsync(target, entity);
	}

	/**
	 * The queryBuilder addon
	 *
	 * @callback queryBuilderFunc
	 * @param {SelectQueryBuilder} queryBuilderFunc.queryBuilder The optional query builder func.
	 */
	/**
	 * Gets a list of company for the current user
	 * @param {string} target The target entity.
	 * @param {string} alias The main table alias.
	 * @param {number} page Page number.
	 * @param {number} pageLimit Number of element per page.
	 * @param {queryBuilderFunc} queryBuilderFunc The query builder.
	 */
	async getAsync(target, alias, page, pageLimit, queryBuilderFunc) {
		return await super.getAsync(target, alias, page, pageLimit, (queryBuilder) => {
			queryBuilder = queryBuilder
				.innerJoin(`${alias}.customer`, 'customer', 'customer.id = :customerId', { customerId: this.customer.id });

			if (queryBuilderFunc)
				queryBuilder = queryBuilderFunc(queryBuilder);

			return queryBuilder;
		});
	}

	/**
	 * Gets an entity by id.
	 * @param {string} target The target entity.
	 * @param {string} alias The main alias.
	 * @param {number} id The entity identifier.
	 * @param {queryBuilderFunc} queryBuilderFunc The query builder.
	 */
	async getByIdAsync(target, alias, id, queryBuilderFunc) {
		return await super.getByIdAsync(target, alias, id, (queryBuilder) => {
			queryBuilder = queryBuilder
				.innerJoin(`${alias}.customer`, 'customer', 'customer.id = :customerId', { customerId: this.customer.id });

			if (queryBuilderFunc)
				queryBuilder = queryBuilderFunc(queryBuilder);

			return queryBuilder;
		});
	}

	/**
	 * Deletes the entity by id.
	 * @param {string} target The target entity.
	 * @param {string} alias The main alias.
	 * @param {number} id The user id.
	 */
	async deleteAsync(target, alias, id) {
		return await super.deleteAsync(target, alias, id, (queryBuilder) => {
			return queryBuilder
				.innerJoin(`${alias}.customer`, 'customer', 'customer.id = :customerId', { customerId: this.customer.id });
		});
	}
}
