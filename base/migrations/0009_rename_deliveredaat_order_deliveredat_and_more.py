# Generated by Django 4.2.3 on 2023-09-04 15:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0008_rename_prix_product_price'),
    ]

    operations = [
        migrations.RenameField(
            model_name='order',
            old_name='deliveredAat',
            new_name='deliveredAt',
        ),
        migrations.RenameField(
            model_name='product',
            old_name='createdAat',
            new_name='createdAt',
        ),
        migrations.RenameField(
            model_name='product',
            old_name='evaluation',
            new_name='rating',
        ),
        migrations.RenameField(
            model_name='shippingaddress',
            old_name='ShippingPrice',
            new_name='shippingPrice',
        ),
    ]
