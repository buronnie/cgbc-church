class FinanceManagerPolicy < ApplicationPolicy
  def index?
    is_finance_manager?
  end

  def show?
    is_finance_manager?
  end

  def create?
    is_finance_manager?
  end

  def new?
    is_finance_manager?
  end

  def update?
    is_finance_manager?
  end

  def edit?
    is_finance_manager?
  end

  def destroy?
    is_finance_manager?
  end

  private

  def is_finance_manager?
    user.has_role?(:finance_manager)
  end
end
