"""Initial migration

Revision ID: 0bc6bfdc3c3f
Revises: 
Create Date: 2024-09-26 00:57:23.821298

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0bc6bfdc3c3f'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('prediction',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('input_data', sa.Text(), nullable=False),
    sa.Column('result', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('prediction')
    # ### end Alembic commands ###
